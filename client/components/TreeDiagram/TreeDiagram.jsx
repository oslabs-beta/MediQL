import React, { useState, useEffect } from 'react';
// const io = require('socket.io-client');
import * as d3 from 'd3';

// const socket = io('http://localhost:3000/queryResponseReceiver');
// const socket = io();

const TreeDiagram = ({ data }) => {
  // create state to hold data from button click

  const [treeData, setTreeData] = useState('');
  console.log('data in treeDiagram', data);
  // make button
  // make button on click
  const getOriginResp = async () => {
    const data = await fetch('http://localhost:3000/originResp', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then((res) => res.json());
    return data;
  };

  const buttonClick = async () => {
    //create fetch request to queryResp
    const data = await fetch('http://localhost:3000/queryResp', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then((res) => res.json());

    // .then((data)=> {
    //   setTreeData(data)
    //   console.log(treeData)
    // });

    // const treeD = document.getElementById('tree-d');
    // treeD.innerHTML = '';
    // const holder = [data.pop()];
    // const filteredData = holder[0].response.queryResp.data;
    // console.log('FilfteredData', filteredData);
    // console.log('holder: ', holder);
    // // const dataKeys = Object.keys(holder[0].response.queryResp);
    // const finalData = [];

    // for (const key in filteredData) {
    //   finalData.push(filteredData[key]);
    // }

    // console.log('finalData', finalData);
    // let groups = d3.rollup(
    //   finalData,
    //   (d) => {
    //     console.log('d', d);
    //     return d.length;
    //   },
    //   (d) => {
    //     return 'movie';
    //   },
    //   (d) => {
    //     return d.director;
    //   },
    //   (d) =>{
    //     return d.title;
    //   }

    // (d) => {
    //   const dataKeys = Object.keys(holder[0].response.queryResp);
    //   console.log('datakeys: ', dataKeys);

    //   return dataKeys;
    // },
    // (d) => {
    //   const movieKeys = Object.keys(holder[0].response.queryResp.data);
    //   console.log('moviekeys: ', movieKeys);
    //   return movieKeys;
    // },
    // (d) => {
    //   return d.response.queryResp.data.movie1.director;
    // },
    // (d) => {
    //   return d.response.queryResp.data.movie1.title;
    // }
    // );

    // console.log(groups, 'groups');

    let root = d3.hierarchy(data);

    console.log('ROOT, ', root);
    // root.sum(function (d) {
    //   console.log('d in root sum', d[1], 'd[0]', d[0]);
    //   return d[1];
    // });

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
      .attr('r', 7)
      .attr('fill', (d) => {
        console.log('d in attr for fill : ', d);
        if (d.data.name === null) {
          return 'red';
        } else {
          return 'green';
        }
      });

    const nodes = d3.selectAll('circle');

    // Add an event listener to each node that listens for a click event
    nodes.on('click', function (d) {
      // Create a div for the pop-up and position it relative to the clicked node
      const popup = d3
        .select('body')
        .append('div')
        .classed('popup', true)
        .style('position', 'absolute')
        .style('left', d.x + 'px')
        .style('top', d.y + 'px');

      // Add content to the pop-up
      popup.append('h2').text('Node ID: ' + d);
      popup.append('p').text('Additional information goes here...');

      // Add a close button to the pop-up
      popup
        .append('button')
        .text('Close')
        .on('click', function () {
          // Remove the pop-up from the DOM when the close button is clicked
          popup.remove();
        });
    });

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
        console.log('d in labels', d);
        return d.data.name;
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
        console.log('d in leaf count labels', d);
        return d.data[1];
      });
  };
  return (
    <div>
      <div>hello</div>
    </div>
  );
};

export default TreeDiagram;
