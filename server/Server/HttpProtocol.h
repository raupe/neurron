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
		static RequestInfo	GetInfo(const std::string msg);
		static bool			IsSocketRequest(const RequestInfo& info);
		static std::string	GetHeader();
		static std::string	GetSocketResponse(const RequestInfo& info);
		
		static void SHA1own(const unsigned char* msg, int length, unsigned int* h);

	private:
		static std::string	GetValue(const std::string key, const std::string msg);
		static std::string	EncodeBase64(const unsigned char* msg, unsigned int length);
	};
}

#endif HttpProtocol_h__