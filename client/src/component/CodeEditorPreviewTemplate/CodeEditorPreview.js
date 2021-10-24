import React from 'react';
import './CodeEditorPreview.scss'
// html - to - pdf 
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import htmlToPdfmake from 'html-to-pdfmake';
var marked = require('marked');
marked.setOptions({
    headerPrefix: "header-"
});
function CodeEditorPreview ({mydata}) {
 
    var value = marked(mydata.body||'');
    function printDocument() {
        const doc = new jsPDF()
        const pdfTable = document.getElementById("result_preview")
        var html = htmlToPdfmake(pdfTable.innerHTML)
        const documentDefinition = {content:html}
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open()
    }
  
    return (
        <>
            
            <div className="preview" >
                <div id="result_preview"  className="tab-pane result_preview active" 
                    dangerouslySetInnerHTML={{__html:value}} style={{maxWidth: '100%',
                        height: 'auto'}}></div>
                <button className="right_button" onClick={printDocument}>PDF 변환</button>
            </div>
      
        </>
    )
}
export default CodeEditorPreview