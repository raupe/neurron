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
		{}

		std::string			m_Method;
		std::string			m_Upgrade;
		std::string			m_Connection;
		std::string			m_SecWebSocketKey;
		std::string			m_Body;
	};

	class HttpProtocol
	{
	public:
		RequestInfo	GetInfo(const std::string msg);
		bool		IsSocketRequest(const RequestInfo& info);
		
		std::string	GetHeader();
		std::string GetErrorHeader();
		std::string	GetMsg(const uchar* msg, uint length);

		std::string	GetSocketHeader(const RequestInfo& info);
		std::string GetSocketMsg(const uchar* msg, uint length);
		
		std::string	EncodeBase64(const unsigned char* msg, unsigned int length);
		void		DecodeBase64(std::string msg, unsigned int& length, unsigned char* out);
		
		void SHA1own(const unsigned char* msg, uint length, unsigned int* h);

	private:
		std::string	GetValue(const std::string key, const std::string msg);
	};
}

#endif