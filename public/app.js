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
