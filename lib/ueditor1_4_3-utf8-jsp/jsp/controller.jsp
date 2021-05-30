<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );

	//自定义保存目录
	String saveRootPath = rootPath;
	
	//saveRootPath = "D:/workspace1/sqkxboxui/Community-box";
	//saveRootPath = "/data/web/web";
	
	System.out.println("rootPath1:["+rootPath+"]");
	out.write( new ActionEnter( request, saveRootPath,rootPath ).exec() );
	System.out.println("rootPath2:["+rootPath+"]");
	
%>