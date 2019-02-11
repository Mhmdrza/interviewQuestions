import React from "react"
import { Link } from "gatsby"

import Layout from "../containers/layout"
import SEO from "../containers/seo"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      terrainData: [1,3,2,4,1,3,1,4,5,2,2,1,4,2],
      volumes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].slice(0,15)
    }
  }
  
  findVolume = (left, right) =>{
    let slicedArray = this.state.terrainData.slice(left+1,right)
    let maximum = arrayMax(slicedArray)
    let peak = this.smallerHeight(right,left)
    console.log('l:', left , '→' ,'r:', right, ' and ', right-left, ' elements');
    if( slicedArray[maximum]>this.heightOf(left) || slicedArray[maximum]>this.heightOf(right)){
      this.findVolume(maximum+left+1,right)
      this.findVolume(left,maximum+left+1)
    }else{
      let c = left
      while (c<=right) {
        let result = this.heightOf(peak) - this.state.terrainData[c]
        this.state.volumes[c] = result>0 ? result : 0
        c++
      }
    }
  }

  heightOf = (i) =>{
    return this.state.terrainData[i]
  }

  smallerHeight = (a,b)=> {
    return this.heightOf(a)<this.heightOf(b) ? a: b
  }

  render(){
    return(
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Challenge 3</h1>
        <p>finding volume of water in the given array </p>
        <input onChange={(e)=>this.setState({terrainData:e.target.value.split(',')})} value={this.state.terrainData}/>
        <button onClick={()=>{
            this.findVolume(0,this.state.terrainData.length-1)
            this.forceUpdate()
          }
        }>update</button>
        <div className='geo-parent'>
          {
            this.state.terrainData.map( (terrain,index) => {
              return (
                <div key={Math.floor(Math.random() * Math.floor(999999999))} className="single-terrain_parent">
                  {this.state.terrainData.slice(0,this.state.volumes[index]).map( t=>
                    <span key={Math.floor(Math.random() * Math.floor(999999999))} className='terrain-bit --blue'/>
                  )}
                  {this.state.terrainData.slice(0,terrain).map( t=>
                    <span key={Math.floor(Math.random() * Math.floor(888888888889))} className='terrain-bit'/>
                  )}
                </div>
              )
            })
          }
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </Layout>
      )
    }
}

function arrayMax(arr) {
  return arr.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}
export default IndexPage
