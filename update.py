#!python
print("Content-Type: text/html")
print()
import cgi, view
form = cgi.FieldStorage()
if 'id' in form:
    pageId = form.getvalue("id")
    description = open('data/'+pageId, 'r').read()
else:
    pageId = 'Welcome'
    description = 'Hello, web'
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
  <form action="process_update.py" method="post">
      <input type="hidden" name="pageId" value={form_default_title}>
      <p><input type="text" name="title" placeholde="title" value={form_default_title}></p>
      <p><textarea rows="4" name="description" placeholder="description">{form_defalut_description}</textarea></p>
      <p><input type="submit"></p>
    </form>
</body>
</html>
'''.format(title=pageId, desc=description, listStr=view.getList(), form_default_title=pageId, form_defalut_description=description))