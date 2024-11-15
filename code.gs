/*
// Source of released : https://github.com/fr-milon/Move-Google-Sheet-Raw-Data-in-Appscript
  Author : MD. MILON HOOSSAIN
  Profile:  https://facebook.com/itsmilonbro
*/

/*
@OnlyCurrentDoc
*/

function onEdit(e){
  let range = e.range;
  let col = range.getColumn();
  let row = range.getRow();
  let val = range.getValue();
  let source = e.source.getActiveSheet();

  if (col == 1 && val != ''){
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(source.getName());
    let targetSheet = ss.getSheetByName(val);
    let data = sheet.getRange(row,1,1,sheet.getLastColumn()).getValues();
    data[0][0] = '';
    targetSheet.appendRow(data[0]);
    sheet.deleteRow(row);
  }
}


/*
    If you need to copy hyperlinks from one sheet to another, use this instead of lines 20-22

    let data = sheet.getRange(row,1,1,sheet.getLastColumn()).getRichTextValues();
    targetSheet.getRange(targetSheet.getLastRow()+1,1,1,data[0].length).setRichTextValues(data);
    targetSheet.getRange(targetSheet.getLastRow(),1).clearContent();

*/

/*
    If you need to copy formulas from one sheet to another, add the following code between lines 22 & 23:

    let formulas = sheet.getRange(row,1,1,sheet.getLastColumn()).getFormulasR1C1();

    for (i=0;i<formulas[0].length;i++){
        if (formulas[0][i] != ''){
            targetSheet.getRange(targetSheet.getLastRow(),i+1).setFormulaR1C1(formulas[0][i]);
        }
    }

*/
