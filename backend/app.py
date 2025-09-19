from flask import Flask, send_file
from playwright.sync_api import sync_playwright
import io

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <h1>HTML to PNG Converter</h1>
    <a href="/convert"><button>Convert to PNG</button></a>
    '''

@app.route('/convert')
def convert():
    # Simple 2-line HTML code
    html_code = """
    <!DOCTYPE html>
    <html>
    <body>
        <h1 style="color: blue; text-align: center;">Hello World</h1>
        <p style="color: red; font-size: 18px;">This is a test conversion</p>
    </body>
    </html>
    """
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # Set the HTML content
        page.set_content(html_code)
        
        # Wait for content to render
        page.wait_for_timeout(100)
        
        # Take screenshot
        screenshot_bytes = page.screenshot(type='png')
        
        browser.close()
        
        # Return as downloadable file
        return send_file(
            io.BytesIO(screenshot_bytes),
            mimetype='image/png',
            as_attachment=True,
            download_name='converted.png'
        )

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)