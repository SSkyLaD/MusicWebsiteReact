/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function PlayListSpace(props){
    const[list,setList] = React.useState(props.musicData);
    //wtf
    useEffect(() => {
        setList(props.musicData);
      }, [props.musicData]);
    //
    function idToIndex(id){
        props.musicData.forEach((value,index)=>{
            if(value.id===id) props.returnIndex(index);
        })
    }

    const listHTML = list.map((data,index) => {
        if(data.id === props.musicData[props.musicIndex].id){
            return(
                <div className="song-element-choose" key={index} onClick={()=>idToIndex(data.id)}>
                <img src={data.coverimage} alt=""/>
                <div className="text-content">
                    <p className="song-name">{data.name}</p>
                    <p className="artis">{data.artist}</p>
                </div>
            </div>
            )
        }
        return(
            <div className="song-element" key={index} onClick={()=>idToIndex(data.id)}>
                <img src={data.coverimage} alt=""/>
                <div className="text-content">
                    <p className="song-name">{data.name}</p>
                    <p className="artis">{data.artist}</p>
                </div>
            </div>
        )
    })

    function searching(event){
        const searchText = event.target.value;
        const reg = new RegExp(`\\b${searchText}`, 'gi');
        let newList =[];
        props.musicData.forEach((value)=>{
            if(reg.test(value.name)) newList.push(value);
        })
        setList(newList);
    }
    
    return(
        <div className="playlist-space">
            <div className="search">
                <input 
                    type="text" 
                    id="search-input" 
                    placeholder="Search here..."
                    onChange={searching}
                ></input>
                <div className="search-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
            <div className="music-list">
                {listHTML}
            </div>
        </div>
    )
}