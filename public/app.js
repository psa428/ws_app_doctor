document.addEventListener('submit',event => {
    
        
        const form = document.getElementById('form');
        event.target.disabled = true;
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let problem = document.getElementById('problem').value;
               
        submit(name, phone, problem)
            .then(result => {
                event.target.disabled = false;
                
            })

            .catch (error => {
                console.error('Ошибка ' + error)
            })        
        // }
}  );

  

async function remove(id) {
    await fetch(`/${id}`, {method:  'DELETE'});
};

async function edit(id, title) {
    
    await fetch(`/${id}`, {
        method: 'PUT',
        headers:    {'Content-Type': 'application/json;characterset=utf-8' },
        body:   JSON.stringify({
            id: id,
            title: title
        })
    });
}

async function submit(name, phone, problem) {
    
    
    const result =  await fetch(`/`, {
        method: 'POST',
        headers:    {'Content-Type': 'application/json;characterset=utf-8' },
        body:  JSON.stringify({
            name:   name,
            phone:  phone,
            problem:    problem
        }) 
    }
    );  
     
    return result; 
};

const getFormattingDate = (date) => {
    //  Преобразование даты в формат DD.MM.YYYY
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    let year = date.getFullYear();

     return day + '.' + month + '.' + year;
}

function myFunction(e) {
    let str = e.target.value;

    // Объявить переменные
  var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
    filter = str.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Перебирайте все строки таблицы и скрывайте тех, кто не соответствует поисковому запросу
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      // console.log(`txtValue = ${txtValue}`)
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

