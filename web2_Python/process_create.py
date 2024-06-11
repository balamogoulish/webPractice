#!python

import cgi
form=cgi.FieldStorage()
title = form.getvalue("title")
description = form.getvalue("description")

opened_file = open('data/'+title, 'w') #data/title 경로의 파일을 쓰기 권한으로 엶
opened_file.write(description) #파일에 description의 내용을 씀
opened_file.close() #파일을 닫음

#redirection
print('Location: index.py?id='+title)
print()