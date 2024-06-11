#!python
print("Content-Type: text/html")
print()
import cgi, os, view
files = os.listdir('data')
form = cgi.FieldStorage()
if 'id' in form:
    pageId = form.getvalue("id")
    description = open('data/'+pageId, 'r').read()
    description= description.replace('<','&lt;')
    description= description.replace('>','&gt;')
    update_link = '<a href="update.py?id={}">update</a>'.format(pageId)
    delete_action ='''
        <form action='process_delete.py' method="post">
            <input type='hidden' name='pageId' value='{}'>
            <input type='submit' value='delete'>
        </form>
    '''.format(pageId)
else:
    pageId = 'Welcome'
    description = 'Hello, web'
    update_link=''
    delete_action=''
print('''<!doctype html>
<html>
<head>
  <title>WEB1 - Welcome</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="index.py">WEB</a></h1>
  <ol>
    {listStr}
  </ol>
  <a href="create.py">create</a>
  {update}
  {delete}
  <h2>{title}</h2>
  <p>{desc}</p>
</body>
</html>
'''.format(title=pageId, desc=description, listStr=view.getList(), update=update_link, delete=delete_action))