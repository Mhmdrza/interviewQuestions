import React from "react"
import { Link } from "gatsby"

import Layout from "../containers/layout"
import SEO from "../containers/seo"
import Image from "../components/image"

const heights = [1,3,2,4,1,3,1,4,5,2,2,1,4,2,2]
const volumes = heights.slice(0,heights.length-1)

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      terrainData: heights
    }
  }
  
  findVolume = (left, right) =>{
    console.log('l:', left , ' → ' ,'r:', right);
    let peak = smallerHeight(right,left)
    for(let i = left+1; i<right; i++){
      if(heightOf(i)>peak){
        peak = smallerHeight(i,left)
        let c=left
        while(c<=i){
          volumes[c]= peak - heights[c]
          c++
        }
        this.findVolume(i,right)
        i++
        break;
      }else{
        volumes[i]= peak - heights[i]
      }
    }
  }

  render(){
    return(
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Challenge 3</h1>
        <button onClick={()=>this.forceUpdate()}>update</button>
        <p>finding volume of water in the given array </p>
        <p>{this.findVolume(0,heights.length-1)}</p>
        <div className='geo-parent'>
          {
            this.state.terrainData.map( (terrain,index) => {
              return (
                <div key={Math.floor(Math.random() * Math.floor(999999999))} className="single-terrain_parent">
                  {heights.slice(0,volumes[index]).map( t=>
                    <span key={Math.floor(Math.random() * Math.floor(999999999))} className='terrain-bit --blue'/>
                  )}
                  {heights.slice(0,terrain).map( t=>
                    <span key={Math.floor(Math.random() * Math.floor(888888888889))} className='terrain-bit'/>
                  )}
                </div>
              )
            })
          }
        </div>
      </Layout>
      )
    }
}
function heightOf (i) {
  return heights[i]
}
function smallerHeight (a,b) {
  return heightOf(a)<heightOf(b) ? heightOf(a): heightOf(b)
}

export default IndexPage
