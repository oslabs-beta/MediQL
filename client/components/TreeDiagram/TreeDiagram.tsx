import React, { useState, useEffect, useRef } from 'react';
import CloseButton from './closeButton';
import { createRoot } from 'react-dom/client';

import * as d3 from 'd3';

interface Data {
  name: string | null;
  children: Data[] | null;
}

interface TreeDiagramProps {
  data: Data[];
}

const TreeDiagram = ({ data }: TreeDiagramProps) => {
  //connects to the DOM and the SVG element returned below
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log('data: ', data);

    if (data !== null) {
      let root = d3.hierarchy<Data>(data);

      let levelWidth = [1];
      let childCount = function (level: number, n: d3.HierarchyNode<Data>) {
        if (n.children && n.children.length > 0) {
          if (levelWidth.length <= level + 1) levelWidth.push(0);

          levelWidth[level + 1] += n.children.length;
          n.children.forEach(function (d) {
            childCount(level + 1, d);
          });
        }
      };
      childCount(0, root);
      // console.log('level width: ', levelWidth);
      let treeHeight = d3.max(levelWidth) * 65;
      let treeLayout = d3.tree<Data>().size([treeHeight, 350]);

      let rootNode = treeLayout(root) as d3.HierarchyPointNode<Data>;

      // Links
      d3.select('svg g')
        .selectAll('line')
        .data(rootNode.links())
        .join('line')
        .attr('x1', function (d) {
          return d.source.y;
        })
        .attr('y1', function (d) {
          return d.source.x;
        })
        .attr('x2', function (d) {
          return d.target.y;
        })
        .attr('y2', function (d) {
          return d.target.x;
        });

      // Nodes
      d3.select('svg g')
        .selectAll('circle')
        .data(rootNode.descendants())
        .join('circle')
        .attr('cx', function (d) {
          return d.y;
        })
        .attr('cy', function (d) {
          return d.x;
        })
        .attr('r', 7)
        .attr('fill', (d) => {
          // console.log('d.data-->', d.data);

          if (d.data.children !== undefined && !d.data.children?.length) {
            // console.log('THIS CHILD IS LENGTH OF 0');
            return 'orange';
          } else if (d.data.statusCode > 299) {
            return 'red';
          } else {
            return 'green';
          }
        })
        .on('click', (event, d) => {
          if (!document.getElementById('popup-data')) {
            // Create overlay
            const overlay = document.createElement('div');
            // This will allow us to do the styling on scss 
            overlay.classList.add('popup-overlay');
            overlay.setAttribute('id', 'popup-overlay');
            document.body.appendChild(overlay);
        
            // Create popup
            const popup = document.createElement('div');

            // This will allow us to do the styling on scss 
            popup.classList.add('popup');
            popup.setAttribute('id', 'popup-data');

            const dataName = document.createElement('h2');
              dataName.setAttribute('class', 'dataName');
              dataName.innerText = `${d.data.name}`;

              const statusCode = document.createElement('p');
              statusCode.innerText = `Status Code: ${d.data.statusCode}`

              const statusMessage = document.createElement('p');
              statusMessage.innerText = `Status Message: ${d.data.statusMsg}`

              const moreInfo = document.createElement('a')
              moreInfo.innerText = 'Show Original Response'
              moreInfo.setAttribute('href', '#')
              moreInfo.setAttribute('id', 'more-info-link')
              
              const displayMoreInfo = document.createElement('div');
              displayMoreInfo.innerHTML = `<pre>${JSON.stringify(d.data.resp, null, 2)}</pre>`
              displayMoreInfo.setAttribute('id', 'more-info');

            if (d.data.statusCodes === 200 || d.data.statusMsg === 'OK') {

              //popup.innerHTML = `${dataName} <br> Status Code: ${d.data.statusCode} <br> Status Message: ${d.data.statusMsg} <br> <a href="#" id="more-info-link">Show Original Response</a><div id="more-info" style="display:none">${response}</div>`;
              popup.append(dataName, statusCode, statusMessage, moreInfo, displayMoreInfo);
              
              const moreInfoLink = popup.querySelector('#more-info-link');
              const moreInfoDiv = popup.querySelector('#more-info');
              moreInfoLink.addEventListener('click', () => {
                if (moreInfoDiv.style.display === 'none') {
                  moreInfoDiv.style.display = 'block';
                  moreInfoLink.textContent = 'Hide Original Response';
                } else {
                  moreInfoDiv.style.display = 'none';
                  moreInfoLink.textContent = 'Show Original Response';
                }
              });
            }
            else if(d.data.statusCodes === 404 || d.data.statusMsg){
              // const respText = d.data.resp ? JSON.stringify(d.data.resp) : 'No response data';
              displayMoreInfo.innerText = d.data.resp ? JSON.stringify(d.data.resp) : 'No response data';
              popup.append(dataName, statusCode, statusMessage, moreInfo, displayMoreInfo);

              const moreInfoLink = popup.querySelector('#more-info-link');
              const moreInfoDiv = popup.querySelector('#more-info');
              moreInfoLink.addEventListener('click', () => {
                if (moreInfoDiv.style.display === 'none') {
                  moreInfoDiv.style.display = 'block';
                  moreInfoLink.textContent = 'Hide Original Response';
                } else {
                  moreInfoDiv.style.display = 'none';
                  moreInfoLink.textContent = 'Show Original Response';
                }
              });
            }
            else if(!d.data.resp && !d.data.children){
              popup.append(dataName)
            }
            else if(d.data.children !== undefined && !d.data.children?.length){
              const childrenData = document.createElement('div')
              childrenData.innerText =  d.data.children ? `Children: ${JSON.stringify(d.data.children)}` : 'Children: Null';
              popup.append(dataName, childrenData);
            }
            else{
              popup.append(dataName);
            }

            let button = document.createElement('div');
            createRoot(button).render(<CloseButton />);
            button.addEventListener('click', function () {
              // Remove the pop-up from the DOM when the close button is clicked
              popup.remove();
              overlay.remove();
            });
            popup.append(button);
            document.body.appendChild(popup);
          }
        });

      // Labels
      d3.select('svg g')
        .selectAll('text.label')
        .data(rootNode.descendants())
        .join('text')
        .classed('label', true)
        .attr('x', function (d) {
          return d.y;
        })
        .attr('y', function (d) {
          return d.x - 10;
        })
        .style('fill', function(d){
          if (d.data.name === 'data') {
            return '#00C2E0';
          } 
          else if(!d.data.resp && !d.data.children){
            return '#FFCC99'
          }
          else {
            return '#70BCFF'; 
          }
        })
        .text(function (d) {
          const name = d.data.name;
          if (typeof name === 'string') {
            if (typeof name === 'string' && name.includes(',')) {
              const words = name.split(' ');
              for (let i = 0; i < words.length; i++) {
                if (words[i].includes(',')) {
                  return words.slice(0, i + 1).join(' ').replace(',', '') + '[...]';
                }
              }
            }
            return name;
          }
        })

      // Leaf count labels
      d3.select('svg g')
        .selectAll('text.count-label')
        .data(rootNode.descendants())
        .join('text')
        .classed('count-label', true)
        .attr('x', function (d) {
          return d.y + 20;
        })
        .attr('y', function (d) {
          return d.x;
        });

      //set view box
      let dimensions = (d3.select('svg g').node() as SVGGElement).getBBox();

      // console.log('dimensions', dimensions);

      let targetTreeD = document.getElementById('tree-d');
      targetTreeD?.setAttribute(
        'viewBox',
        `${dimensions.x} 
         ${dimensions.y}
         ${dimensions.width * 1.3}
         ${dimensions.height}`
      );
    }
  });
  return (
    <>
      <div id="tree-container">
        <svg id="tree-d">
          <g transform="translate(30, 0)"></g>
        </svg>
      </div>
    </>
  );
};

export default TreeDiagram;
