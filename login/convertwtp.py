import pypandoc
import sys

def convert_docx_to_pdf(docx_path, pdf_path):
    # Convert DOCX to PDF
    output = pypandoc.convert_file(docx_path, 'pdf', outputfile=pdf_path)
    assert output == ""

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert.py <input.docx> <output.pdf>")
        sys.exit(1)
    
    docx_path = sys.argv[1]
    pdf_path = sys.argv[2]
    
    convert_docx_to_pdf(docx_path, pdf_path)
    print(f"Converted {docx_path} to {pdf_path}")
    