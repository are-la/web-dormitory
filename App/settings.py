def get_db_uri(dbinfo):
    engine = dbinfo.get("ENGINE") or "mysql"
    driver = dbinfo.get("DRIVER") or "pymysql"
    user = dbinfo.get("USER") or "root"
    password = dbinfo.get("PASSWORD") or ""
    host = dbinfo.get("HOST") or "localhost"
    port = dbinfo.get("PORT") or "3306"
    dbname = dbinfo.get("DBNAME") or "Dormitory"
    # uri数据库+驱动://用户名:密码@主机:端口/具体哪一个库
    return '{}+{}://{}:{}@{}:{}/{}'.format(engine, driver, user, password, host, port, dbname)


class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False



# 开发环境
class DevelopConfig(Config):
    DEBUG = True

    dbinfo = {
        "ENGINE": "mysql",
        "DRIVER": "pymysql",
        "USER": "root",
        "PASSWORD": "111111",
        "HOST": "127.0.0.1",
        "PORT": "3306",
        "DBNAME": "Dormitory"
    }

    SQLALCHEMY_DATABASE_URI = get_db_uri(dbinfo)


# 测试环境
class TestConfig(Config):

    dbinfo = {
        "ENGINE": "mysql",
        "DRIVER": "pymysql",
        "USER": "root",
        "PASSWORD": "123456",
        "HOST": "127.0.0.1",
        "PORT": "3306",
        "DBNAME": "flask_test"
    }

    SQLALCHEMY_DATABASE_URI = get_db_uri(dbinfo)


# 演示环境
class StageConfig(Config):

    dbinfo = {
        "ENGINE": "mysql",
        "DRIVER": "pymysql",
        "USER": "root",
        "PASSWORD": "123456",
        "HOST": "127.0.0.1",
        "PORT": "3306",
        "DBNAME": "flask_test"
    }

    SQLALCHEMY_DATABASE_URI = get_db_uri(dbinfo)


# 线上（生产）环境
class ProductConfig(Config):

    dbinfo = {
        "ENGINE": "mysql",
        "DRIVER": "pymysql",
        "USER": "root",
        "PASSWORD": "123456",
        "HOST": "127.0.0.1",
        "PORT": "3306",
        "DBNAME": "flask_test"
    }

    SQLALCHEMY_DATABASE_URI = get_db_uri(dbinfo)

envs = {
    "develop": DevelopConfig,
    "testing": TestConfig,
    "staging": StageConfig,
    "product": ProductConfig,
    "default": DevelopConfig
}