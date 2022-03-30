const socket = io();

socket.on('showProducts', (products)=>{
    console.log('Showing Products');
    render(products);
})

function render(data){
    const html = data.map((elem, index)=>{
        return(
            `<div class="item-card">
            <h2>Product</h2>
            <h3>Title: ${elem.title}</h3>
            <h3>Price: ${elem.price}</h3>
            <img src="${elem.thumbnail}"/>
        </div>`
        )
    });
    document.getElementById('test').innerHTML = html;
}

