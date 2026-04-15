import FilterBar from './src/filter-bar.vue'
export declare const YhFilterBar: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<
        import('vue').ExtractPropTypes<{
          sorts: {
            type: import('vue').PropType<import('./index.js').FilterSortItem[]>
            default: () => never[]
          }
          filters: {
            type: import('vue').PropType<import('./index.js').FilterItem[]>
            default: () => never[]
          }
          sort: {
            type: import('vue').PropType<import('./index.js').FilterSort>
            default: () => import('./index.js').FilterSort
          }
          filterValue: {
            type: import('vue').PropType<import('./index.js').FilterValue>
            default: () => {}
          }
          showAll: {
            type: BooleanConstructor
            default: boolean
          }
          sticky: {
            type: BooleanConstructor
            default: boolean
          }
          stickyOffset: {
            type: NumberConstructor
            default: number
          }
          filterInPanel: {
            type: BooleanConstructor
            default: boolean
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
          showGlobalFilter: {
            type: BooleanConstructor
            default: boolean
          }
          showViewToggle: {
            type: BooleanConstructor
            default: boolean
          }
          viewType: {
            type: import('vue').PropType<'list' | 'grid'>
            default: string
          }
        }>
      > &
        Readonly<{
          onConfirm?: ((val: import('./index.js').FilterValue) => any) | undefined
          onReset?: (() => any) | undefined
          'onUpdate:sort'?: ((sort: import('./index.js').FilterSort) => any) | undefined
          'onUpdate:filterValue'?: ((val: import('./index.js').FilterValue) => any) | undefined
          'onUpdate:viewType'?: ((val: 'list' | 'grid') => any) | undefined
          onSortChange?: ((sort: import('./index.js').FilterSort) => any) | undefined
          onFilterChange?: ((val: import('./index.js').FilterValue) => any) | undefined
          onViewChange?: ((val: 'list' | 'grid') => any) | undefined
          onResetPanel?:
            | ((
                filter: import('./index.js').FilterItem,
                _currentValues: import('./index.js').FilterValue
              ) => any)
            | undefined
          onOpenFilter?: (() => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {
        confirm: (val: import('./index.js').FilterValue) => void
        reset: () => void
        'update:sort': (sort: import('./index.js').FilterSort) => void
        'update:filterValue': (val: import('./index.js').FilterValue) => void
        'update:viewType': (val: 'list' | 'grid') => void
        sortChange: (sort: import('./index.js').FilterSort) => void
        filterChange: (val: import('./index.js').FilterValue) => void
        viewChange: (val: 'list' | 'grid') => void
        resetPanel: (
          filter: import('./index.js').FilterItem,
          _currentValues: import('./index.js').FilterValue
        ) => void
        openFilter: () => void
      },
      import('vue').PublicProps,
      {
        filters: import('./index.js').FilterItem[]
        sort: import('./index.js').FilterSort
        showAll: boolean
        themeOverrides: Record<string, string>
        sticky: boolean
        sorts: import('./index.js').FilterSortItem[]
        filterValue: import('./index.js').FilterValue
        stickyOffset: number
        filterInPanel: boolean
        showGlobalFilter: boolean
        showViewToggle: boolean
        viewType: 'list' | 'grid'
      },
      true,
      {},
      {},
      import('vue').GlobalComponents,
      import('vue').GlobalDirectives,
      string,
      {},
      any,
      import('vue').ComponentProvideOptions,
      {
        P: {}
        B: {}
        D: {}
        C: {}
        M: {}
        Defaults: {}
      },
      Readonly<
        import('vue').ExtractPropTypes<{
          sorts: {
            type: import('vue').PropType<import('./index.js').FilterSortItem[]>
            default: () => never[]
          }
          filters: {
            type: import('vue').PropType<import('./index.js').FilterItem[]>
            default: () => never[]
          }
          sort: {
            type: import('vue').PropType<import('./index.js').FilterSort>
            default: () => import('./index.js').FilterSort
          }
          filterValue: {
            type: import('vue').PropType<import('./index.js').FilterValue>
            default: () => {}
          }
          showAll: {
            type: BooleanConstructor
            default: boolean
          }
          sticky: {
            type: BooleanConstructor
            default: boolean
          }
          stickyOffset: {
            type: NumberConstructor
            default: number
          }
          filterInPanel: {
            type: BooleanConstructor
            default: boolean
          }
          themeOverrides: {
            type: import('vue').PropType<Record<string, string>>
            default: () => {}
          }
          showGlobalFilter: {
            type: BooleanConstructor
            default: boolean
          }
          showViewToggle: {
            type: BooleanConstructor
            default: boolean
          }
          viewType: {
            type: import('vue').PropType<'list' | 'grid'>
            default: string
          }
        }>
      > &
        Readonly<{
          onConfirm?: ((val: import('./index.js').FilterValue) => any) | undefined
          onReset?: (() => any) | undefined
          'onUpdate:sort'?: ((sort: import('./index.js').FilterSort) => any) | undefined
          'onUpdate:filterValue'?: ((val: import('./index.js').FilterValue) => any) | undefined
          'onUpdate:viewType'?: ((val: 'list' | 'grid') => any) | undefined
          onSortChange?: ((sort: import('./index.js').FilterSort) => any) | undefined
          onFilterChange?: ((val: import('./index.js').FilterValue) => any) | undefined
          onViewChange?: ((val: 'list' | 'grid') => any) | undefined
          onResetPanel?:
            | ((
                filter: import('./index.js').FilterItem,
                _currentValues: import('./index.js').FilterValue
              ) => any)
            | undefined
          onOpenFilter?: (() => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        filters: import('./index.js').FilterItem[]
        sort: import('./index.js').FilterSort
        showAll: boolean
        themeOverrides: Record<string, string>
        sticky: boolean
        sorts: import('./index.js').FilterSortItem[]
        filterValue: import('./index.js').FilterValue
        stickyOffset: number
        filterInPanel: boolean
        showGlobalFilter: boolean
        showViewToggle: boolean
        viewType: 'list' | 'grid'
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<
      import('vue').ExtractPropTypes<{
        sorts: {
          type: import('vue').PropType<import('./index.js').FilterSortItem[]>
          default: () => never[]
        }
        filters: {
          type: import('vue').PropType<import('./index.js').FilterItem[]>
          default: () => never[]
        }
        sort: {
          type: import('vue').PropType<import('./index.js').FilterSort>
          default: () => import('./index.js').FilterSort
        }
        filterValue: {
          type: import('vue').PropType<import('./index.js').FilterValue>
          default: () => {}
        }
        showAll: {
          type: BooleanConstructor
          default: boolean
        }
        sticky: {
          type: BooleanConstructor
          default: boolean
        }
        stickyOffset: {
          type: NumberConstructor
          default: number
        }
        filterInPanel: {
          type: BooleanConstructor
          default: boolean
        }
        themeOverrides: {
          type: import('vue').PropType<Record<string, string>>
          default: () => {}
        }
        showGlobalFilter: {
          type: BooleanConstructor
          default: boolean
        }
        showViewToggle: {
          type: BooleanConstructor
          default: boolean
        }
        viewType: {
          type: import('vue').PropType<'list' | 'grid'>
          default: string
        }
      }>
    > &
      Readonly<{
        onConfirm?: ((val: import('./index.js').FilterValue) => any) | undefined
        onReset?: (() => any) | undefined
        'onUpdate:sort'?: ((sort: import('./index.js').FilterSort) => any) | undefined
        'onUpdate:filterValue'?: ((val: import('./index.js').FilterValue) => any) | undefined
        'onUpdate:viewType'?: ((val: 'list' | 'grid') => any) | undefined
        onSortChange?: ((sort: import('./index.js').FilterSort) => any) | undefined
        onFilterChange?: ((val: import('./index.js').FilterValue) => any) | undefined
        onViewChange?: ((val: 'list' | 'grid') => any) | undefined
        onResetPanel?:
          | ((
              filter: import('./index.js').FilterItem,
              _currentValues: import('./index.js').FilterValue
            ) => any)
          | undefined
        onOpenFilter?: (() => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {
      confirm: (val: import('./index.js').FilterValue) => void
      reset: () => void
      'update:sort': (sort: import('./index.js').FilterSort) => void
      'update:filterValue': (val: import('./index.js').FilterValue) => void
      'update:viewType': (val: 'list' | 'grid') => void
      sortChange: (sort: import('./index.js').FilterSort) => void
      filterChange: (val: import('./index.js').FilterValue) => void
      viewChange: (val: 'list' | 'grid') => void
      resetPanel: (
        filter: import('./index.js').FilterItem,
        _currentValues: import('./index.js').FilterValue
      ) => void
      openFilter: () => void
    },
    string,
    {
      filters: import('./index.js').FilterItem[]
      sort: import('./index.js').FilterSort
      showAll: boolean
      themeOverrides: Record<string, string>
      sticky: boolean
      sorts: import('./index.js').FilterSortItem[]
      filterValue: import('./index.js').FilterValue
      stickyOffset: number
      filterInPanel: boolean
      showGlobalFilter: boolean
      showViewToggle: boolean
      viewType: 'list' | 'grid'
    },
    {},
    string,
    {},
    import('vue').GlobalComponents,
    import('vue').GlobalDirectives,
    string,
    import('vue').ComponentProvideOptions
  > &
    import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps &
    (new () => {
      $slots: {
        'filter-icon'?: (props: {}) => any
      } & {
        'view-icon'?: (props: { viewType: 'list' | 'grid' }) => any
      } & {
        extra?: (props: {}) => any
      } & {
        'panel-content'?: (props: {
          filter: {
            [x: string]: unknown
            key: string
            label: string
            type?: import('./index.js').FilterType | undefined
            options?:
              | {
                  label: string
                  value: string | number
                }[]
              | undefined
            min?: number | undefined
            max?: number | undefined
          }
          value: import('./index.js').FilterValue
          toggle: (
            item: import('./index.js').FilterItem,
            option: import('./index.js').FilterOption
          ) => void
        }) => any
      }
    })
> &
  Record<string, unknown>
export default YhFilterBar
export * from './src/filter-bar'
export type FilterBarInstance = InstanceType<typeof FilterBar>
export type YhFilterBarInstance = FilterBarInstance
export type YhFilterBarProps = import('./src/filter-bar').FilterBarProps
export type YhFilterBarEmits = import('./src/filter-bar').FilterBarEmits
export type YhFilterBarSlots = import('./src/filter-bar').FilterBarSlots
export type YhFilterSortOrder = import('./src/filter-bar').FilterSortOrder
export type YhFilterSortItem = import('./src/filter-bar').FilterSortItem
export type YhFilterType = import('./src/filter-bar').FilterType
export type YhFilterOption = import('./src/filter-bar').FilterOption
export type YhFilterItem = import('./src/filter-bar').FilterItem
export type YhFilterValue = import('./src/filter-bar').FilterValue
export type YhFilterSort = import('./src/filter-bar').FilterSort
