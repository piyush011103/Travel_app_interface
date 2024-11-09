export const dateReducer = (state, { type, payload }) => {
  switch (type) {
    case 'OPEN_SEARCH_MODAL':
      return {
        ...state,
        isSearchModalOpen: !state.isSearchModalOpen, 
      };
      case 'CHECK_IN':
        return {
          ...state,
          checkinDate: payload,
        };
      case 'CHECK_OUT':
        return {
          ...state,
          checkoutDate: payload,
        };
        case 'DESTINATION':
          return {
            ...state,
            destination: payload,
          };
        case 'GUESTS':
          return {
            ...state,
            guests: payload,
          };
      case 'DATE_FOCUS':
        return {
          ...state,
          isSearchResultOpen: false,
        };
      case 'CLOSE_SEARCH_RESULT':
        return {
          ...state,
          isSearchResultOpen: true,
        };
      case "CLOSE_SEARCH_MODAL":
        return {
          ...state,
          isSearchModalOpen: !state.isSearchModalOpen,
        }
    default:
      return state;
  }
};