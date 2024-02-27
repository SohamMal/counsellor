async function EnterCollege() {
    const cc = document.getElementById('cc').value;
    console.log(cc);

    const cn = document.getElementById('college_name').value;
    console.log(cn);

    const cl=document.getElementById('college_location').value;
    console.log(cl)

    const requestBody = {
        college_code: cc,
        college_name: cn,
        college_location:cl
    };

    try {
        const response = await fetch('http://localhost:4000/colleges', {
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
        alert(msg);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
