#ifndef HttpProtocol_h__
#define HttpProtocol_h__

#include <string>

namespace sv
{
	struct RequestInfo
	{
		RequestInfo()
		: m_Method("")
		, m_Upgrade("")
		, m_Connection("")
		, m_SecWebSocketKey("")
		, m_Body("")
		, m_BodyLen(0)
		, m_HeaderComplete(false)
		{}

		std::string			m_Method;
		std::string			m_Upgrade;
		std::string			m_Connection;
		std::string			m_SecWebSocketKey;
		std::string			m_Body;
		uchar				m_BodyLen;
		bool				m_HeaderComplete;
	};

	class HttpProtocol
	{
	public:
		RequestInfo	GetInfo(const std::string msg);
		bool		IsSocketRequest(const RequestInfo& info);
		bool		RequestComplete(const RequestInfo& info);
		
		//std::string	GetHeader();
		std::string GetErrorHeader();
		void		GetMsg(const uchar* msg, char* buffer, uint& length);

		std::string	GetSocketHeader(const RequestInfo& info);
		void		GetSocketMsg(const uchar* msg, char* buffer, uint& length);
		
		void		EncodeBase64(const unsigned char* msg, char* buffer, uint& length);
		void		DecodeBase64(std::string msg, unsigned int& length, unsigned char* buffer);
		
		void SHA1own(const unsigned char* msg, uint length, unsigned int* h);

	private:
		std::string	GetValue(const std::string key, const std::string msg);
	};
}

#endif