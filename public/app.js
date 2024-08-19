document.addEventListener('click',event => {
    
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    } else if (event.target.dataset.type === 'edit') {
        const idEdit = event.target.dataset.id
        
        
        let currentTitle = event.target.dataset.title;
        let newTitle = prompt('Редактирование заметки', currentTitle);
       
        if (newTitle) {
            edit(idEdit, newTitle).then (() => location.reload());   
        }
        
    }

}  )

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