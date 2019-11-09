// spl语句映射文件,供api调用
const splMap = {
    user: {
        add: 'insert into user (username, password, repeatPass, email, phone) values (?,?,?,?,?,?,?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    }
}

module.exports = splMap