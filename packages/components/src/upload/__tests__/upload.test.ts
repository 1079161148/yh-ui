import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { YhUpload } from '../index'

describe('Upload', () => {
  it('render test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        fileList: []
      }
    })
    expect(wrapper.find('.yh-upload').exists()).toBe(true)
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
  })

  it('multiple test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        multiple: true
      }
    })
    expect(wrapper.find('input').attributes('multiple')).toBeDefined()
  })

  it('accept test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        accept: '.jpg'
      }
    })
    expect(wrapper.find('input').attributes('accept')).toBe('.jpg')
  })

  it('drag test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        drag: true
      }
    })
    expect(wrapper.find('.yh-upload__dragger').exists()).toBe(true)
  })

  it('directory test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        directory: true
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('webkitdirectory')).toBeDefined()
    expect(input.attributes('multiple')).toBeDefined()
  })

  it('disabled test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('crossorigin test', () => {
    const wrapper = mount(YhUpload, {
      props: {
        fileList: [
          { name: 'test.png', url: 'https://test.com/test.png', status: 'success', uid: 1 }
        ],
        listType: 'picture-card',
        crossorigin: 'anonymous'
      }
    })
    const img = wrapper.find('img')
    expect(img.attributes('crossorigin')).toBe('anonymous')
  })
})
