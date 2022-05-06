from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# 将SQLAlchemy定义为db
db = SQLAlchemy()
# 将Migrate定义为migrate
migrate = Migrate()

# 创建init_ext方法，用于懒加载模型
def init_ext(app):
    db.init_app(app=app)
    migrate.init_app(app, db)

