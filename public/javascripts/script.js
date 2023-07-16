document.querySelector("form").style.display = "none"

let maxId = 0;
let pKey = '';

async function getEployees()
{
    try 
    {
        const res = await fetch('http://localhost:3000/api/employees')        
        const data = await res.json()//text
        return data;
        //console.log(data)
    } 
    catch (error) 
    {
        console.log("Error resource fetching ",error)
    }
}
//getEployees()

async function setup() 
{
    const emps = await getEployees()

    const tbody = document.querySelector("#preview")   
   
    emps.forEach((e) => 
    {
        fn = (typeof e.first_name !== "undefined") ? e.first_name : ''
        ln = (typeof e.last_name !== "undefined") ? e.last_name : ''
        const objE = new Employee(e.id, fn +' '+ ln, 
        e.job_title, e.address+', '+e.city)

        tbody.innerHTML += objE.createRow();

        maxId = e.id>maxId ? e.id : maxId;
    }); 
    
}  
setup() 

async function handleSubmit(e)
{
    e.preventDefault() 
     
    const first_name = e.target[0].value 
    const last_name = e.target[1].value 
    const job_title = e.target[2].value 
    const address = e.target[3].value 
    const city = e.target[4].value 

    if(!first_name || !last_name) 
    {
        toggle(false)
        return
    }

    console.log("sending...")

    const id = +maxId + 1
    
    const data = {id, first_name, last_name, job_title, address, city}

    //fetch("https://ewasveta.github.io/???",
    fetch ("http://localhost:3000/api/employees",
    {
        method: "POST",
        headers: 
        {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            //"Content-Type": "text/plain",
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resData => 
        {
            if(resData.errors?.length > 0)
            {  
                let errTxt = ''
                for (const err of resData.errors) {
                    errTxt +=  err + "<br/>"
                }
                console.log(errTxt)
            }
    })
    
   toggle(false)
}

function toggle(bool)
{    
    document.querySelector("form").style.display = 
                        bool  ?  "block" : "none"
}

function selectedVal(valK, id)
{
    document.querySelector(`#ul${id}`).style.display = "none"
    document.querySelector(`#uDiv${id}`).style.display = "block"

    pKey = valK;
}
function patchByKey(id)
{
    let pVal = document.querySelector(`#inp${id}`).value    

    const data = {"id":id, [pKey]:pVal}
    
    console.log(data)

    fetch ("http://localhost:3000/api/employees/" + id,
    {
        method: "PATCH",
        headers: 
        {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            //"Content-Type": "text/plain",
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resData => 
        {
            if(resData.errors?.length > 0)
            {  
                let errTxt = ''
                for (const err of resData.errors) {
                    errTxt +=  err + "<br/>"
                }
                console.log(errTxt)
            }
    })
    console.log("here patch")

    document.querySelector(`#uDiv${id}`).style.display = "none"
}


function eUpdate(id)
{
    document.querySelector(`#ul${id}`).style.display = "block"
}
function eDelete(id)
{    
    console.log("deleting...")
    //fetch("https://ewasveta.github.io/???/"+id,
    fetch ("http://localhost:3000/api/employees/" + id,
    {
        method: "DELETE",
        headers: 
        {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            //"Content-Type": "text/plain"
            //'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(res => res.json())
    .then(resData => {
        if(resData.errors?.length > 0)
        {
            let errTxt = ''
            for (const err of resData.errors) {
                errTxt +=  err + "<br/>"
            }
            console.log(errTxt)
        }
    })    
}