export interface SignUp{
    username : string,
    email:string,
    password:string


}

export interface logIn{
    email:string,
    password:string
}

export interface product{
          id:number,
          productName :string,
          productPrice:number,
          productColor:string,
          productDescription:string,
          productImg:string,
          productquantity:undefined | number
    
}

export interface cart{
          id:number,
          productName :string,
          productPrice:number,
          productColor:string,
          productDescription:string,
          productImg:string,
          productquantity:undefined | number,
          userId :number,
          productId:number
}