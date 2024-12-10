export class FeeTypeDef {
    static FeeTypeArray:any[]=[
        {TypeText:"Organization Level",TypeValue:1},
        {TypeText:"Course Level",TypeValue:2},
        {TypeText:"Student Level",TypeValue:3}
      ];

      static GetFeeTypeText(val:number):string|undefined
      {
        return FeeTypeDef.FeeTypeArray.find((rec:any)=>rec.TypeValue==val).TypeText;
      }
}
