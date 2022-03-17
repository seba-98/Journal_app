
export const uploadImage = async(file) =>{

    const formData=new FormData();

    formData.append('upload_preset', 'reactJournal');
    formData.append('file', file);

    try{
        const resp= await fetch(process.env.REACT_APP_UPLOAD_IMG, {
            method:'POST',
            body:formData
        })

        if(resp.ok){
            const cloudResp=await resp.json();
            return cloudResp.secure_url;
        }
        else{
            throw await resp.json();
        }

    }
    catch(err){
        console.log(err);
    }

}