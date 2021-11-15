import React from 'react';
import './CodeEditorPreview.scss'
// html - to - pdf 
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
        
        const pdfTable = document.getElementById("result_preview")
        // htmlToImage.toPng(pdfTable,{quality:0.95}).then((dataUrl)=> {
        //     var link = document.createElement('a');
        //     link.download = 'my-image-name.jpeg';
        //     const pdf = new jsPDF();
        //     const imgProps= pdf.getImageProperties(dataUrl);
        //     const pdfWidth = pdf.internal.pageSize.getWidth()/2;
        //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //     pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth,pdfHeight);
        //     pdf.output('dataurlnewwindow', {})
        var html = htmlToPdfmake(pdfTable.innerHTML)
        const documentDefinition = {content:html}
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        // pdfMake.createPdf(documentDefinition,null,fonts).open()
        pdfMake.createPdf(documentDefinition).open()
        
    //     var html = htmlToPdfmake(pdfTable.innerHTML)
    //     const documentDefinition = {content:html}
    //     pdfMake.vfs = pdfFonts.pdfMake.vfs;
    //     pdfMake.createPdf(documentDefinition).open()
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