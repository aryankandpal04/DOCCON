from pdf2docx import Converter

def convert_pdf_to_docx(pdf_path, docx_path):
    # Convert PDF to DOCX
    cv = Converter(pdf_path)
    cv.convert(docx_path, start=0, end=None)
    cv.close()

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python convert.py <input.pdf> <output.docx>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    docx_path = sys.argv[2]
    
    convert_pdf_to_docx(pdf_path, docx_path)
    print(f"Converted {pdf_path} to {docx_path}")
 