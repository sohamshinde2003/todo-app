import React from 'react'
import { deleteSnapshot } from '../api-firebase/api-config';

export default function Card({data,reload}) {
    /** {
    "taskName": "a",
    "priority": "Urgent",
    "taskDescription": "a",
    "taskDeadline": "2024-01-13T23:01",
    "id": "iPe3kRT10VAK66tJsyKo"
}
     */
    const handleDelete = async () => {
        await deleteSnapshot(data.id);
        reload()
  };
    return (
        <div class="card">
            <div class="card-div">
                <div class="card-title">{data.taskName}</div>
                <div><i class="bi bi-trash" onClick={handleDelete}></i></div>
            </div>
            <div class="card-priority">{data.priority}</div>
            <div class="card-note">
                <p>{data.taskDescription}</p>
            </div>
            <div class="card-baseline">{data.taskDeadline.replace("T"," ") }</div>
        </div>
    )
}
