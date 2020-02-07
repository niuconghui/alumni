const sendMail = require('./mail')

sendMail('ncherish@163.com', '这里是邮件内容', '这里是邮件标题')
  .then(() => {
    // console.log('发送成功啦QAQxxxxx');
  })
  .catch(() => {
    // console.log('发送失败了呢^.^');
  })