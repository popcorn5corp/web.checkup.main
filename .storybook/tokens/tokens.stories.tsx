import {base, theme} from './colors'
import {spacing} from './spacing'
import {radius} from './radius'
import {elevation} from './elevation'

export default {
  title: 'Design Token/Token',
}

function CopyItem(element: Element, copyValue: string){
  return (
    <div class="copy-wrapper" onClick={() => onCopy((copyValue ?? element as string))}>
      {element}
      <span className="copy-icon"><font-awesome-icon icon="fa-regular fa-clone" /></span>
    </div>
  )
}

function onCopy(value: string) {
  window.navigator.clipboard.writeText(value);
}


function TokenContainer(token) {
  return (
    <>
      {Object.keys(token).map((key) =>{
      return (
        <>
          {TokenTable(key.toUpperCase(),
            <>
              <thead >
                <tr style={{textAlign: 'left' }}>
                  <th style={{width: '300px'}}>Token</th>
                  <th style={{width: '300px'}}>Value</th>
                  <th style={{width: '150px'}}>Example</th>
                </tr>
              </thead>
              <tbody>
                  {token[key].map((color) => TokenRow(color))}
              </tbody>
            </>
          )}
        </>
      )
    })}
    </>
  )
}

function TokenTable(title:string,content:Element)  {
  return (
    <>
      <h2>{title}</h2>
      <table class="table-container">{content}</table>
    </>
  );
};


function TokenRow({ variables,value }) {
  return (
    <tr>
      <td>{CopyItem(<span className="badge">{variables}</span>,variables)}</td>
      <td>{CopyItem(value)}</td>
      <td class="box-type-3">{TokenTd(variables,value)}</td>
    </tr>
  )
}

function TokenTd(tokenType: string, value: string) {
  return (
    <>
      {tokenType.includes("size") && <div class="box-type-1" style={{ height:value }}></div>}
      {tokenType.includes("shape") && <div class="box-type-1" style={{ borderRadius: value, height:'50px' }}></div>}
      {tokenType.includes("color") && <div class="box-type-2" style={{ backgroundColor: value }}></div>}
      {tokenType.includes("elevation") && <div class="box-type-2 box-type-4" style={{ boxShadow: value }}></div>}
    </>
  )
}


export const BaseColors = {
  render: () => TokenContainer(base)
}

export const ThemeColors = {
  render: () => TokenContainer(theme)
}

export const Spacing = {
  render: () => TokenContainer(spacing)
}

export const Radius = {
  render: () => TokenContainer(radius)
}

export const Elevation = {
  render: () => TokenContainer(elevation)
}

