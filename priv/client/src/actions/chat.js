import {
    POST_CONTRACT,
    POST_CONTRACT_SUCCESS,
    POST_CONTRACT_FAILURE
} from '../constants/contracts';

function postContract (informations) {
    return {
        type: POST_CONTRACT,
        informations
    };
}

function postContractSuccess () {
    return {
        type: POST_CONTRACT_SUCCESS
    };
}

function postContractFailure () {
    return {
        type: POST_CONTRACT_FAILURE
    };
}

export {
    postContract,
    postContractSuccess,
    postContractFailure
};
