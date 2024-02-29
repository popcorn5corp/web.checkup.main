import { base, theme } from './colors'
import { elevation } from './elevation'
import { fontSize, fontWeight } from './font'
import { radius } from './radius'
import { spacing } from './spacing'

export default {
  title: 'Design Token/Token'
}

function CopyItem(element: Element, copyValue: string) {
  return (
    <div class="copy-wrapper">
      {element}
      {/* <span className="copy-icon">
        <font-awesome-icon icon="fa-regular fa-clone" />
      </span> */}
    </div>
  )
}

// function onCopy(value: string) {
//   window.navigator.clipboard.writeText(value)
// }

function TokenContainer(token) {
  return (
    <div>
      {Object.keys(token).map((key) => {
        return (
          <div>
            {TokenTable(
              key.toUpperCase(),
              <div>
                <thead>
                  <tr style={{ textAlign: 'left' }}>
                    <th style={{ width: '300px' }}>Token</th>
                    <th style={{ width: '300px' }}>Value</th>
                    <th style={{ width: '150px' }}>Example</th>
                  </tr>
                </thead>
                <tbody>{token[key].map((color) => TokenRow(color))}</tbody>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function TokenTable(title: string, content: Element) {
  return (
    <div>
      <h2>{title}</h2>
      <table class="table-container">{content}</table>
    </div>
  )
}

function TokenRow({ variables, value }) {
  return (
    <tr>
      <td>{CopyItem(<span className="badge">{variables}</span>, variables)}</td>
      <td>{CopyItem(value)}</td>
      <td class="box-type-3">{TokenTd(variables, value)}</td>
    </tr>
  )
}

function TokenTd(tokenType: string, value: string) {
  return (
    <div>
      {tokenType.includes('font-size') && (
        <div style={{ fontSize: value }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br /> abcdefghijklmnopqrstuvwxyz
        </div>
      )}
      {tokenType.includes('font-weight') && (
        <div style={{ fontWeight: value }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br /> abcdefghijklmnopqrstuvwxyz
        </div>
      )}
      {tokenType.includes('spacing') && <div class="box-type-1" style={{ height: value }}></div>}
      {tokenType.includes('radius') && (
        <div class="box-type-1" style={{ borderRadius: value, height: '50px' }}></div>
      )}
      {tokenType.includes('color') && (
        <div class="box-type-2" style={{ backgroundColor: value }}></div>
      )}
      {tokenType.includes('elevation') && (
        <div class="box-type-2 box-type-4" style={{ boxShadow: value }}></div>
      )}
    </div>
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

export const FontSize = {
  render: () => TokenContainer(fontSize)
}

export const FontWeight = {
  render: () => TokenContainer(fontWeight)
}
