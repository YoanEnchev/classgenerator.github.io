const propertiesTable = $('.properties');
const newRow = `<tr> <td> <input type=text class="property-name form-control" required> </td> <td> <select class="property-type form-control"> <option value="string">String</option> <option value="int">Int</option> <option value="double">Double</option> </select> </td> <td> <button type="button" class="btn btn-danger delete">Delete</button> </td> </tr> <tr>`;
const textareaCode = ` <div class="form-group codeToShow mt-5"> <h4 class="text-center">Generated Code: </h4> <textarea rows="10" class="form-control"></textarea> </div>`;

 $('form').submit((e) => e.preventDefault());
 $('.delete').click(deleteRow); 
 
 function addRow() 
 { propertiesTable.append(newRow); 
 $('.delete').click(deleteRow); 
 }
 
 function deleteRow() {
	 $(this).parent().parent().remove(); 
}
	 function generateCode() { 
	 if($(`input:required:invalid`).length > 0)
		 { return; } $('.codeToShow').remove(); 
	 let className = $('#className').val(); 
	 let code = ` #include <iostream>
 #include <string>
 
 using namespace std;
 
 class ${className} {\n`;
 let propertyNames = $('.property-name');
 let propertyTypes = $('.property-type');
 
 for(let i = 0; i < propertyNames.length; i++)
 { 
code += ` ${$(propertyTypes[i]).val()} ${$(propertyNames[i]).val()}; \n\n`;
 } 
 code += ` public:\n`; 
 for(let i = 0; i < propertyNames.length; i++)
	 { 
 let name = $(propertyNames[i]).val(); 
 let capitalized = name.charAt(0).toUpperCase() + name.slice(1);
 code += ` ${$(propertyTypes[i]).val()} get${capitalized}() \n`;
 code += ` {\n`; code += ` return ${$(propertyNames[i]).val()};\n`; code += ` }\n\n`; code += ` void set${capitalized}(${$(propertyTypes[i]).val()} ${name}_parameter) \n`; code += ` {\n`; code += ` ${$(propertyNames[i]).val()} = ${name}_parameter;\n`; code += ` }\n\n`; } code += ` ${className}()\n`; code += ` {\n`; code += ` }\n`; code += ` };\n`; $('form').append(textareaCode); $('textarea').val(code); }