import {useState} from 'react';
import { Modal, Input, Button } from 'components';
import axios from 'axios';

export default function EditServiceModal({data, refetch, onClose}) {
    const [body, setBody] = useState({
        "id": data?.id,
        "numberValue": data?.serviceParameterValues[0].serviceParamNumberValue,
        "stringValue": "",
        "dateValue": "2022-09-15"
    })

    async function editRequest() {
        await axios.put(`/asclepius/v1/api/accounting/contract-to-service/service-params/${data?.serviceParameterValues[0].id}`, body)
        .then((response)=> {refetch(); onClose()})
        .catch((error)=> alert(error))
    } 

    return <>
        <Modal onBackClick={()=> onClose()}>
            <h2>Edit service</h2>
            <Input 
                label="Service duration"
                value={body.numberValue}
                onChange={(e)=> {setBody((prev)=>({...prev, numberValue: e}))}} 
            />
            <Button 
                label="Edit"
                variant="fill"
                size="large"
                onClick={()=> editRequest()} 
            />
        </Modal>
    </>
}