class Employee
{
    constructor(id, name=0, position=0, address=0)
    {
        this.id = id
        this.name = name
        this.position = position 
        this.address = address 

        this.url = id % 2
        ? `https://randomuser.me/api/portraits/women/${id}.jpg`
        : `https://randomuser.me/api/portraits/men/${id}.jpg`
        
        //console.log( this.url)
    }

    createRow()
    {        
        return `<tr>
                    <th scope="row">${this.id}</th>
                    <td><img src="${this.url}" alt="employee No.${this.id}" width="150" height="150"></td>                    
                    <td>${this.name}</td>
                    <td>${this.position}</td>
                    <td>${this.address}</td>                    
                    <td>
                        <button class="btn btn-outline-light text-secondary border-secondary" onclick="eUpdate(${this.id})">Edit</button>
                        <button class="btn btn-secondary" onclick="eDelete(${this.id})">Delete</button>
                        <br/>                        
                        <ul class="list-group" id="ul${this.id}" style="display:none">                    
                            <li class="list-group-item"> 
                                <input onchange="selectedVal(this.value, ${this.id})" class="form-check-input me-1" type="radio" name="listGroupRadio" value="first_name" id="fr">
                                <label class="form-check-label" for="firstRadio">First name</label>
                            </li>
                            <li class="list-group-item">
                                <input onchange="selectedVal(this.value, ${this.id})" class="form-check-input me-1" type="radio" name="listGroupRadio" value="last_name" id="sr">
                                <label class="form-check-label" for="secondRadio">Last name</label>
                            </li>
                            <li class="list-group-item">
                                <input onchange="selectedVal(this.value, ${this.id})" class="form-check-input me-1" type="radio" name="listGroupRadio" value="job_title" id="tr">
                                <label class="form-check-label" for="thirdRadio">Position</label>
                            </li>
                             <li class="list-group-item">
                                <input onchange="selectedVal(this.value, ${this.id})" class="form-check-input me-1" type="radio" name="listGroupRadio" value="address" id="fr">
                                <label class="form-check-label" for="thirdRadio">Address</label>
                            </li>  
                            <li class="list-group-item">
                                <input onchange="selectedVal(this.value, ${this.id})" class="form-check-input me-1" type="radio" name="listGroupRadio" value="city" id="nr">
                                <label class="form-check-label" for="thirdRadio">City</label>
                            </li>                                                      
                        </ul>
                        <div id="uDiv${this.id}"  style="display:none">
                            <div class="col-auto">
                                <input type="text" class="form-control" id="inp${this.id}" placeholder="input">
                            </div>
                            <div class="col-auto">
                                <button onclick="patchByKey(${this.id})" class="btn btn-success mb-2">Patch</button>
                            </div>
                        </div>
                    </td>
                </tr>`
    }
}