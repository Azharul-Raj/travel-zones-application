import React from 'react'
import { Range} from 'react-date-range'
import Calendar from '../Input/Calendar';
import Button from '../Nav/Button/Button';

interface ListingReservationProps{
    price:number;
    dateRange:Range;
    totalPrice:number;
    onChangeDate:(value:Range)=>void;
    onSubmit:()=>void;
    disabled:boolean;
    disabledDates:Date[];
}
function ListingReservation({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates}:ListingReservationProps) {

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center p-4 gap-1">
          <h4 className="font-semibold text-2xl">${price}</h4>
          <p className="font-light text-neutral-600">night</p>
      </div>
      <hr />
      <Calendar
       value={dateRange}
       disabledDates={disabledDates}
       onChange={(value)=>onChangeDate(value.selection)}
      />
      <div className="p-4">
        <Button
         disabled={disabled}
         label='Reserve'
         onClick={onSubmit}
        />
      </div>
      <hr />
      <div className="flex items-center justify-between font-semibold text-lg p-4">
        <h4>Total</h4>
        <p>${totalPrice}</p>
      </div>
    </div>
  )
}

export default ListingReservation;