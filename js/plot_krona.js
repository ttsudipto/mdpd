function getKronaData(bioproject, assayType, isolationSource, kronaType) {
    var prefix = 'input/krona/';
    if(kronaType == 'runwise') {
        var file = prefix + bioproject.replace(/ /g,"_") + '_' + assayType.replace(/ /g,"_") + '_krona_' + kronaType.replace(/ /g,"_") + '.html';
//         var display = disease + ' | ' + assayType + ' | ' + isolationSource + ' (' + kronaType + ')';
    } else if(kronaType == 'subgroup') {
        var file = prefix + bioproject.replace(/ /g,"_") + '_' + assayType.replace(/ /g,"_") + '_' + isolationSource.replace(/ /g,"_") + '_krona_' + kronaType.replace(/ /g,"_") + '.html';
//         var display = 'BioProject ID: ' + bioproject + ' - ' + ' | ' + assayType + ' | ' + isolationSource;
    }
//     alert(queryType+'<br/>'+bioproject+'<br/>'+disease+'<br/>'+assayType+'<br/>'+isolationSource+'<br/>'+kronaType+'\n'+file);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
//             alert(this.responseText);
            var frame = document.getElementById('krona_frame');
            frame.contentWindow.document.open();
            frame.contentWindow.document.write(this.responseText);
            frame.contentWindow.document.close();

            if(document.getElementById('display_text'))
                document.getElementById('display_text').innerHTML = '<h3>' + display + '</h3>';
            if(document.getElementById('merged_div')) {
                if(kronaType == 'Merged') {
                    document.getElementById('merged_div').style.borderWidth = '4px';
                    document.getElementById('runwise_div').style.borderWidth = '2px';
                } else {
                    document.getElementById('merged_div').style.borderWidth = '2px';
                    document.getElementById('runwise_div').style.borderWidth = '4px';
                }
            }
        }
    };
    xmlhttp.open('GET', file, true);
    xmlhttp.setRequestHeader('Content-type', 'text/html');
    xmlhttp.send();
}

// Function to select a single Run ID for single-Run-ID Krona plot
function selectRun(run) {
    var frame = document.getElementById('krona_frame');
    // Select the appropriate Run ID from the selector dropdown
    frame.contentWindow.document.getElementById('datasets').value = run;
    // Trigger an event to change the plot to the selected Run ID
    frame.contentWindow.document.getElementById('datasets').dispatchEvent(new Event('change'));
    // Hide the Run ID selector dropdown
    frame.contentWindow.document.getElementById('datasets').style.display = 'none';
}
