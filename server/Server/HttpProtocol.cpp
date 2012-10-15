#include "ServerPCH.h"
#include "HttpProtocol.h"

#include "hl_sha1.h"

#ifndef WIN32
#include <string.h>
#endif

sv::RequestInfo sv::HttpProtocol::GetInfo(const std::string msg)
{
	RequestInfo info;

	unsigned int pos = msg.find(" ");
	if(pos != -1)
		info.m_Method = msg.substr(0, pos);

	pos = msg.find("\r\n\r\n");
	if(pos != -1)
	{
		info.m_Body = msg.substr(pos + 4);
	}
	
	info.m_Connection = HttpProtocol::GetValue("Connection: ", msg);
	info.m_Upgrade = HttpProtocol::GetValue("Upgrade: ", msg);
	info.m_SecWebSocketKey = HttpProtocol::GetValue("Sec-WebSocket-Key: ", msg);
	
	return info;
}

std::string sv::HttpProtocol::GetValue(const std::string key, const std::string msg)
{
	unsigned int posStart = msg.find(key);
	if(posStart != -1)
	{
		posStart += key.length();
		unsigned int posEnd = msg.find("\r", posStart);
		if(posEnd == -1)
			posEnd = msg.length();
		return msg.substr(posStart, posEnd - posStart);
	}
	return std::string();
}

bool sv::HttpProtocol::IsSocketRequest(const sv::RequestInfo& info)
{
	return info.m_Connection == "Upgrade"
		&& info.m_Upgrade == "websocket";
}

std::string	sv::HttpProtocol::GetHeader()
{
	return "HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods:\"GET, POST, PUT, DELETE, OPTIONS\"\r\nAccess-Control-Allow-Header:\"content-type, accept\"\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n";
}

std::string	sv::HttpProtocol::GetSocketResponse(const sv::RequestInfo& info)
{
	// add "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
	//std::string step1 = "The quick brown fox jumps over the lazy dog"; //info.m_SecWebSocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
	std::string step1 = info.m_SecWebSocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

	// hash SHA-1
	HL_SHA1_CTX *context = S_NEW HL_SHA1_CTX;
	SHA1 sha1;
	sha1.SHA1Reset(context);
	sha1.SHA1Input(context, (const hl_uint8 *)step1.c_str(), step1.length());

	unsigned char step2[20];
	sha1.SHA1Result(context, step2);

	// encode Base64	
	std::string acceptKey = EncodeBase64(step2, 20);

	return "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + acceptKey + "\r\n\r\n";
}

char GetChar(char val)
{
	if(val <= 25)
		return 'A' + val;
	if(val <= 51)
		return 'a' + (val - 26);
	if(val <= 61)
		return '0' + (val - 52);
	if(val = 62)
		return '+';
	if(val = 63)
		return '/';
	return '\0';
}

std::string	sv::HttpProtocol::EncodeBase64(const unsigned char* msg, unsigned int length)
{
	std::string retVal = "";
	unsigned int pos = 0;
	while(pos < length)
	{
		unsigned char parts[4];
		unsigned char src[3];
		src[0] = msg[pos];
		src[1] = pos+1 < length? msg[pos+1] : 0;
		src[2] = pos+2 < length? msg[pos+2] : 0;

		parts[0] = (src[0] & 0xFC) >> 2;
		parts[1] = ((src[0] & 0x3) << 4) | ((src[1] & 0xF0) >> 4);
		parts[2] = ((src[1] & 0xF) << 2) | ((src[2] & 0xC0) >> 6);
		parts[3] = src[2] & 0x3F;

		if(pos + 2 < length)
			retVal = retVal + GetChar(parts[0]) + GetChar(parts[1]) + GetChar(parts[2]) + GetChar(parts[3]);
		else if(pos + 1 < length)
			retVal = retVal + GetChar(parts[0]) + GetChar(parts[1]) + GetChar(parts[2]) + '=';
		else
			retVal = retVal + GetChar(parts[0]) + GetChar(parts[1]) + '=' + '=';
		
		pos += 3;
	}
	return retVal;
}

void sv::HttpProtocol::SHA1own(const unsigned char* msgIn, int length, unsigned int* h)
{
	h[0] = 0x67452301;
	h[1] = 0xEFCDAB89;
	h[2] = 0x98BADCFE;
	h[3] = 0x10325476;
	h[4] = 0xC3D2E1F0;

	unsigned int msgLen = length * 8;

	unsigned int minLen = msgLen + 8 + 64;
	unsigned int len = minLen + (512 - minLen % 512);
	unsigned int arrayLen = len / 32;
	unsigned int* msg = new unsigned int[arrayLen];

	memset(msg, 0, arrayLen * 4);
	memcpy(msg, msgIn, length);
	msg[length/4] = 1 << 31;
	msg[arrayLen - 2] = msgLen;

	for(unsigned int j=0; j<arrayLen; j+=16) //for 526bit blocks: 512 / 32 = 16
	{
		unsigned int* block = new unsigned int[80];

		for(unsigned int i=0; i<16; i+=1) //for 32bit words
			block[i] = msg[j+i];

		for(unsigned int i=16; i<80; i++)
		{
			block[i] = (block[i-3] ^ block[i-8] ^ block[i-14] ^ block[i-16]);
			unsigned int tempBit = block[i] >> 31;
			block[i] = block[i] << 1 | tempBit;
		}
		
		unsigned int a = h[0];
		unsigned int b = h[1];
		unsigned int c = h[2];
		unsigned int d = h[3];
		unsigned int e = h[4];

		unsigned int f = 0;
		unsigned int k = 0;

		for(unsigned int i=0; i<80; i++)
		{
			if(i < 20)
			{
				f = (b & c) | ((!b) & d);
				k = 0x5A827999;
			}
			else if(i < 40)
			{
				f = b ^ c ^ d;
				k = 0x6ED9EBA1;
			}
			else if(i < 60)
			{
				f = (b & c) | (b & d) | (c & d);
				k = 0x8F1BBCDC;
			}
			else
			{
				f = b ^ c ^ d;
				k = 0xCA62C1D6;
			}

			// ...


		}





		delete[](block);
	}
	


	delete[](msg);
}