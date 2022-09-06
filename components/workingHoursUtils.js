export function getFirstStartEndHours(workingHours) {
    const findFirstItem = workingHours?.filter((e)=> e.startHour !== '' && e.endHour !== '')[0];
    return findFirstItem
}

export function handleChange(i, e, param, workingHours, setWorkingHours) {
    const start = workingHours.map((x,dex)=>{
        if(dex === i){
            return {
                ...x,
                [param]: e.toString(),
                days: i + 1
            }
        }else {
            return {
                ...x
            }
        }
    })
    
    return setWorkingHours(start)
}

export function activeWorkingHours(i, workingHours, setWorkingHours) {
    const workingHs = workingHours.map((x, dex)=>{
        if(dex === i){
            return {
                ...x,
                active: !x.active,
                startHour: '',
                endHour: '',
                days: i + 1
            }
        }else {
            return {
                ...x
            }
        }
    })
    return setWorkingHours(workingHs)
}


export const dayz = [
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday', 
    'Sunday'
]