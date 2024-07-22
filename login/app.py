from flask import Flask, request, render_template, send_file, redirect, url_for
import os
from convertwtp import convert_docx_to_pdf
from convertptw import convert_pdf_to_docx
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Change this to a secret key for session management

UPLOAD_FOLDER = os.path.join(os.path.expanduser(''), 'word_to_pdf', 'uploads')

UPLOAD_FOLDER = os.path.join(os.path.expanduser('~'), 'pdf_to_word', 'uploads')
# Function to create a connection to the SQLite databaseAtiq Ahmed Case Explained
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Function to create the database table if it doesn't exist
def create_table():
    try:
        conn = get_db_connection()
        conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)')
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error creating table: {e}")

# Function to check if a user exists in the database
def user_exists(username):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    return user is not None

# Function to add a new user to the database
def add_user(username, password):
    try:
        conn = get_db_connection()
        hashed_password = generate_password_hash(password)
        conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
        conn.commit()
        print(f"User '{username}' added to the database.")
        conn.close()
    except Exception as e:
        print(f"Error adding user '{username}' to the database: {e}")

# Route for the home page
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'login' in request.form:
            return redirect(url_for('login'))
        elif 'signup' in request.form:
            return redirect(url_for('signup'))
    return render_template('index.html')

# Route for the signup page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if not user_exists(username):
            add_user(username, password)
            return redirect(url_for('login'))
        else:
            return render_template('index.html', alert="Username already exists. Please choose a different username.")
    return render_template('index.html')
# Route for the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        conn.close()
        if user and check_password_hash(user['password'], password):
            # You can add session management here
            return redirect(url_for('home'))
        else:
            if not user_exists(username):
                return render_template('index.html', alert="Username is not exist. Please sign up.")
            else:
                return render_template ('index.html', alert = "Invalid username or password.")
    return render_template('index.html',)
# Route for the final project page
@app.route('/home', endpoint='home')
def home():
    # You can add session management here
    return render_template('home.html')
@app.route('/logout')
def logout():
    # You can add session management here
    return redirect(url_for('index'))
@app.route('/image_converter', endpoint='image_converter')
def image_converter():
    return render_template('image.html')

@app.route('/audio_converter', endpoint='audio_converter') 
def audio_converter():
    return render_template('audio.html')

@app.route('/video_converter', endpoint='video_converter')
def video_converter():
    return render_template('video.html')
@app.route('/pdf_to_word', endpoint='pdf_to_word')
def pdf_to_word():
    return render_template('pdf_to_word.html')

@app.route('/convertptw', methods=['POST'])
def convert_file():
    if 'file' not in request.files:
        return redirect(url_for('pdf_to_word', error="No file part"))
    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('pdf_to_word', error="No selected file"))
    if file and file.filename.endswith('.pdf'):
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)
        output_path = os.path.join(UPLOAD_FOLDER, file.filename.replace('.pdf', '.docx'))
        file.save(input_path)
        convert_pdf_to_docx(input_path, output_path)
        return send_file(output_path, as_attachment=True)
    return redirect(url_for('pdf_to_word', error="Invalid file format. Only .pdf files are supported."))

@app.route('/word_to_pdf', endpoint='word_to_pdf')
def word_to_pdf():
    return render_template('word_to_pdf.html')

@app.route('/convertwtp', methods=['POST'])
def convert_file2():
    if 'file' not in request.files:
        return redirect(url_for('word_to_pdf', error="No file part"))
    file = request.files['file']
    if file.filename == '':
        return redirect(url_for('word_to_pdf', error="No selected file"))
    if file and file.filename.endswith('.docx'):
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)
        output_path = os.path.join(UPLOAD_FOLDER, file.filename.replace('.docx', '.pdf'))
        file.save(input_path)
        convert_docx_to_pdf(input_path, output_path)
        return send_file(output_path, as_attachment=True)
    return redirect(url_for('word_to_pdf', error="Invalid file format. Only .docx files are supported."))



@app.route('/editing', endpoint='editing')
def editing():
    return render_template('editing.html')

@app.route('/compressor', endpoint = 'compressor')
def compressor():
    return render_template('compressor.html')

@app.route('/about', endpoint='about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    create_table()  # Create the users table if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
