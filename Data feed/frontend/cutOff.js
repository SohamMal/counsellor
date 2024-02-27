async function handleSubmit(){
    const college_code=document.getElementById("cc").value;
    const branch=document.getElementById("Branch").value;
    console.log(branch);
    const gender=document.getElementById("Gender").value;
    const category=document.getElementById("Category").value;
    const cuttoff=document.getElementById("Cuttoff").value;
    const requestBody={
        college_code,
        branch,
        gender,
        category,
        cuttoff
    }

    try {
        const response = await fetch('http://localhost:4000/cuttoff', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const msg = await response.json();
        alert(msg.msg);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}