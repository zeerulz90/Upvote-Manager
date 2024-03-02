import { useContext, useState, createContext, useEffect } from 'react';

const UpvoteListsContext = createContext();
const UpvoteListAddContext = createContext();
const UpvoteAddContext = createContext();
const UpvoteRemoveContext = createContext();
const UpvoteSelectionContext = createContext();
const UpvoteListRemoveContext = createContext();

export function useUpvote() {
    return useContext(UpvoteListsContext);
}

export function useUpvoteListAdd() {
    return useContext(UpvoteListAddContext);
}

export function useUpvoteAdd() {
    return useContext(UpvoteAddContext);
}

export function useUpvoteRemove() {
    return useContext(UpvoteRemoveContext);
}

export function useUpvoteSelection() {
    return useContext(UpvoteSelectionContext);
}

export function useUpvoteListRemove() {
    return useContext(UpvoteListRemoveContext);
}

export function UpvoteListsProvider({ children }) {
    const [upvoteLists, setUpvoteLists] = useState(() => {
        const localVal = localStorage.getItem("UPVOTE_LISTS");
        if (localVal == null) return [];
        return JSON.parse(localVal);
    });

    const addUpvoteList = () => {
        setUpvoteLists(currentUpvoteList => {
            return [ ...currentUpvoteList, { id: window.crypto.randomUUID(), upvoteCount: 0, selected: false } ];
        })
    }

    const addUpvote = (id) => {
        setUpvoteLists(currentUpvoteList => {
            return currentUpvoteList.map(upvoteList => {
                if (upvoteList.id === id) return { ...upvoteList, upvoteCount: upvoteList.upvoteCount + 1 };
                return upvoteList;
            })
        });
    }

    const removeUpvote = (id) => {
        setUpvoteLists(currentUpvoteList => {
            return currentUpvoteList.map(upvoteList => {
                if (upvoteList.id === id) return { ...upvoteList, upvoteCount: upvoteList.upvoteCount - 1 };
                return upvoteList;
            })
        });
    }

    const toggleSelection = (id) => {
        setUpvoteLists(currentUpvoteList => {
            return currentUpvoteList.map(upvoteList => {
                if (upvoteList.id === id) return { ...upvoteList, selected: !upvoteList.selected };
                return upvoteList;
            })
        });
    }

    const removeUpvoteList = (id) => {
        setUpvoteLists(currentUpvoteList => {
            return currentUpvoteList.filter(upvoteList => upvoteList.id !== id);
        });
    }

    useEffect(() => {
        localStorage.setItem("UPVOTE_LISTS", JSON.stringify(upvoteLists));
    }, [upvoteLists]);

    return (
        <UpvoteListsContext.Provider value={upvoteLists}>
            <UpvoteListAddContext.Provider value={addUpvoteList}>
                <UpvoteAddContext.Provider value={addUpvote}>
                    <UpvoteRemoveContext.Provider value={removeUpvote}>
                        <UpvoteSelectionContext.Provider value={toggleSelection}>
                            <UpvoteListRemoveContext.Provider value={removeUpvoteList}>
                                {children}
                            </UpvoteListRemoveContext.Provider>
                        </UpvoteSelectionContext.Provider>
                    </UpvoteRemoveContext.Provider>
                </UpvoteAddContext.Provider>
            </UpvoteListAddContext.Provider>
        </UpvoteListsContext.Provider>
    );
}