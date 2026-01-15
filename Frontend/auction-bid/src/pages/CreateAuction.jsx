import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Loader} from '../components/Loader'

export const CreateAuction = () => {
  const [condition, setCondition] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

    const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state);

  const handleSubmit=(e)=>{
    e.preventDefault()
    const form=new FormData();
    form.append('title',title);
    form.append('description',description);
    form.append('category',category);
    form.append('condition',condition);
    form.append('startingBid',startingBid);
    form.append('startTime',startTime);
    form.append('endTime',endTime);
}
  return (
    <div>
      {loading?(<Loader/>):(<div>
        <div>
        <form action="">
          <div>
            <span>Title</span>
            <input type="text" />
          </div>
          <div><span>Image</span><input type="file" /></div>
          <div>
            <span>Description</span>
            <input type="text" />
          </div>
          <div>
            <span>Category</span>
            <input type="text" />
          </div>
          <div>
            <span>Condition</span>
            <select
              name="condition"
              id=""
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">Select Condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div>
            <span>Starting Bid</span>
            <input type="number" />
          </div>
          <div>
            <span>Start Time</span>
            <input type="datetime-local" />
          </div>
          <div>
            <span>End Time</span>
            <input type="datetime-local" />
          </div>
        </form>
      </div>
      </div>)}
    </div>
  );
};
