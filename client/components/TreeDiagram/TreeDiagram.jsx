import React, { useState, useEffect } from 'react';
// const io = require('socket.io-client');
import * as d3 from 'd3';

// const socket = io('http://localhost:3000/queryResponseReceiver');
// const socket = io();

const TreeDiagram = () => {
  // create state to hold data from button click 
  const [treeData, setTreeData] = useState('');

  // make button
  // make button on click 
  const buttonClick = async () => {
    //create fetch request to queryResp 
    const data = await fetch('http://localhost:3000/queryResp', {
      method: "GET",
      headers: { "content-type": "application/json" },
			})
      .then((res) => res.json())
      // .then((data)=> {
      //   setTreeData(data)
      //   console.log(treeData)
      // });
    const holder = [data.pop()];
    console.log('holder: ', holder);
    const dataKeys = Object.keys(holder[0].response.queryResp);
    const movieKeys = Object.keys(holder[0].response.queryResp.data);
    console.log('datakeys: ', dataKeys)
    console.log('moviekeys: ', movieKeys)

    let groups = d3.rollup(
      holder,
      (d) => {
        return d.length;
      },
      (d) => {
        const dataKeys = Object.keys(holder[0].response.queryResp);
        console.log('datakeys: ', dataKeys);
        return dataKeys;
      },
      (d) => {
        const movieKeys = Object.keys(holder[0].response.queryResp.data);
        console.log('moviekeys: ', movieKeys);
        return movieKeys;
      },
      (d) => {
        return d.response.queryResp.data.movie1.director;
      },
      (d) => {
        return d.response.queryResp.data.movie1.title;
      }
    );



    let root = d3.hierarchy(groups);
  
    root.sum(function (d) {
        return d[1];
    });

    let treeLayout = d3.tree().size([650, 350]);

    treeLayout(root);

    // Links
    d3.select('svg g')
      .selectAll('line')
      .data(root.links())
      .join('line')
      .attr('x1', function (d) {
        return d.source.x;
      })
      .attr('y1', function (d) {
        return d.source.y;
      })
      .attr('x2', function (d) {
        return d.target.x;
      })
      .attr('y2', function (d) {
        return d.target.y;
      });

    // Nodes
    d3.select('svg g')
      .selectAll('circle')
      .data(root.descendants())
      .join('circle')
      .attr('cx', function (d) {
        return d.x;
      })
      .attr('cy', function (d) {
        return d.y;
      })
      .attr('r', 7);

    // Labels
    d3.select('svg g')
      .selectAll('text.label')
      .data(root.descendants())
      .join('text')
      .classed('label', true)
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y - 18;
      })
      .text(function (d) {
        console.log('d in labels', d)
        return d.data[0];
      });

    // Leaf count labels
    d3.select('svg g')
      .selectAll('text.count-label')
      .data(root.descendants())
      .join('text')
      .classed('count-label', true)
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y + 20;
      })
      .text(function (d) {
        if (d.height > 0) return '';
        console.log('d in leaf count labels', d)
        return d.data[1];
      });


    // console.log('holder-->',holder);
    // // console.log('holder.data.Movie.title-->',holder.data.Movie.title)
    // setTreeData(holder.data.Movie.title);
    // console.log('treedata', treeData)
}
  return (
    <>
      <button onClick={buttonClick}>Fetch /queryResp</button>
      {treeData && <div>{treeData}</div>}
    </>
  
  )
};

export default TreeDiagram;


  //useContext, useEffect to grab data from rerender in the graphql call!
  // const [queryData, setQueryData] = useState([]);

  // useEffect(() => {
  //   socket.on('message', (newData) => {
  //     console.log('received message:', newData);
  //   });
  // });
  

  // let groups = d3.rollup(
  //   data,
  //   function (d) {
  //     return d.length;
  //   },
  //   function (d) {
  //     return d.Distributor;
  //   },
  //   function (d) {
  //     return d.Genre;
  //   }
  // );

  // console.log(...groups, 'groups');

  // let root = d3.hierarchy(groups);

  // console.log('ROOT', ...root);

  // root.sum(function (d) {
  //   return d[1];
  // });

  // let treeLayout = d3.tree().size([650, 350]);

  // treeLayout(root);

  // // Links
  // d3.select('svg g')
  //   .selectAll('line')
  //   .data(root.links())
  //   .join('line')
  //   .attr('x1', function (d) {
  //     return d.source.x;
  //   })
  //   .attr('y1', function (d) {
  //     return d.source.y;
  //   })
  //   .attr('x2', function (d) {
  //     return d.target.x;
  //   })
  //   .attr('y2', function (d) {
  //     return d.target.y;
  //   });

  // // Nodes
  // d3.select('svg g')
  //   .selectAll('circle')
  //   .data(root.descendants())
  //   .join('circle')
  //   .attr('cx', function (d) {
  //     return d.x;
  //   })
  //   .attr('cy', function (d) {
  //     return d.y;
  //   })
  //   .attr('r', 7);

  // // Labels
  // d3.select('svg g')
  //   .selectAll('text.label')
  //   .data(root.descendants())
  //   .join('text')
  //   .classed('label', true)
  //   .attr('x', function (d) {
  //     return d.x;
  //   })
  //   .attr('y', function (d) {
  //     return d.y - 18;
  //   })
  //   .text(function (d) {
  //     return d.data[0];
  //   });

  // // Leaf count labels
  // d3.select('svg g')
  //   .selectAll('text.count-label')
  //   .data(root.descendants())
  //   .join('text')
  //   .classed('count-label', true)
  //   .attr('x', function (d) {
  //     return d.x;
  //   })
  //   .attr('y', function (d) {
  //     return d.y + 20;
  //   })
  //   .text(function (d) {
  //     if (d.height > 0) return '';
  //     return d.data[1];
  //   });


