export const state = () => ({
    listManager: [
        {
            id: 1,
            name: 'List Demo',
            image: null,
            list: []
        }
    ],
    id: 1,
    listCategory: [
        {
            id: '1',
            text: 'Electronics',
            value: 'Electronics'
        },
        {
            id: '2',
            text: 'Computers',
            value: 'Computers'
        },
        {
            id: '3',
            text: 'Automotive',
            value: 'Automotive'
        },
        {
            id: '4',
            text: 'Baby',
            value: 'Baby'
        },
        {
            id: '5',
            text: 'Beauty and personal care',
            value: 'Beauty and personal care'
        },
        {
            id: '6',
            text: 'Kichen',
            value: 'Kichen'
        },
        {
            id: '7',
            text: 'Pet',
            value: 'Pet'
        },
    ]
});

export const getters = {
    listManager: state => state.listManager
};

export const mutations = {
    addListManager(state, options) {
        if (options.name) {
            if (!state.listManager.some(o => o.name === options.name)) {
                state.listManager.push({id: ++state.id,name: options.name, list: [], image: null, listCate: []});
            }
        }
    },
    removeListById(state, id) {
        state.listManager = state.listManager.filter(o => Number(o.id) !== Number(id) );
    },
    addNewItem(state, options) {
        if (options.idList) {
            this.state.listManager.map(o => {
                if (Number(o.id) === Number(options.idList))
                    o.list.push(options.item);
            })
        }
    },
    editItem(state, options) {
        if (options.idList) {
            this.state.listManager.map(o => {
                if (Number(o.id) === Number(options.idList)) {
                    o.list.map(p => {
                        if (p.id === options.item.id) {
                            p.name = options.item.name;
                            p.description = options.item.description;
                            p.image = options.item.image
                        }  
                    })
                } 
            });
        }
    },
    removeItemById(state, options) {
        state.listManager.map(o => {
            if (Number(o.id) === Number(options.idList)) {
                o.list = o.list.filter(p => p.id !== options.idItem);
            }
        });
    },
    updateImgList(state, options) {
        state.listManager.map(o => {
            if (Number(o.id) === Number(options.id))
                o.image = options.image;
        })
    }
};

export const actions = {
    addNewList({commit}, options) {
        if (!options)
            options = {};
        commit('addListManager', options);
    },
    getListById({commit, state}, options) {
        if (!options)
            options = {};
        let result = null;
        if (options.id) {
            result = state.listManager.find(o => Number(o.id) === Number(options.id));
        }
        return result;
    },
    removeListById({commit, state}, options) {
        if (options.id) {
            commit('removeListById', options.id);
        }
    },
    addNewItem({commit}, options) {
        if (!options)
            options = {};
        commit('addNewItem', options);
    },
    editItem({commit}, options) {
        if (!options)
            options = {};
        commit('editItem', options);
    },
    removeItemById({commit}, options) {
        if (options.idList) {
            commit('removeItemById', options);
        }
    },
    updateImgList({commit}, options) {
        if (!options)
            options = {};
        commit('updateImgList', options);
    }
};