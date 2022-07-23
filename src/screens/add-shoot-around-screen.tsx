import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import BasketballCourt from '../components/basketball-court/basketball-court';
import Button from '../components/common/button/button';
import Snackbar from '../components/common/snackbar/snackbar';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {ShootAroundSpot} from '../domain/shoot-around';
import {
    resetShootAroundForm,
    setAddShootAroundSubmitSuccess,
    setShootAroundFormValues,
    submitShootAround
} from '../redux/reducers/add-shootaround/add-shootaround-reducer';
import colors from '../colors';
import {useComponentWillUnmount} from '../hooks/useComponentWillUnmount';

const AddShootAroundScreen = () => {
    const totalAttempts = useAppSelector(state => state.addShootAround.totalAttempts);
    const madeAttempts = useAppSelector(state => state.addShootAround.madeAttempts);
    const shootAroundSpot = useAppSelector(state => state.addShootAround.shootAroundSpot);
    const isLoading = useAppSelector(state => state.addShootAround.isLoading);
    const submitDisabled = useAppSelector(state => state.addShootAround.submitDisabled);
    const submitSuccess = useAppSelector(state => state.addShootAround.submitSuccess);
    const error = useAppSelector(state => state.addShootAround.error);

    const dispatch = useAppDispatch();

    useComponentWillUnmount(() => {
        dispatch(resetShootAroundForm());
    });

    return (
        <View testID='add-shoot-around-container' style={styles.container}>
            <BasketballCourt
                selectedSpot={shootAroundSpot}
                onSpotSelected={(selectedSpot: ShootAroundSpot) => {
                    dispatch(setShootAroundFormValues({
                        totalAttempts: totalAttempts,
                        madeAttempts: madeAttempts,
                        shootAroundSpot: selectedSpot
                    }));
                }} />
            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    <Text
                        testID='total-attempts-text-input-title'
                        style={styles.labelTitle}>
                        Total Attempts
                    </Text>
                    <TextInput
                        testID='total-attempts-text-input'
                        style={styles.textInputStyle}
                        editable
                        placeholder='Total Attempts...'
                        keyboardType='numeric'
                        autoCapitalize='none'
                        contextMenuHidden
                        value={totalAttempts?.toString()}
                        onChangeText={(value) => {
                            dispatch(setShootAroundFormValues({
                                totalAttempts: value,
                                madeAttempts: madeAttempts,
                                shootAroundSpot: shootAroundSpot
                            }));
                        }} />
                </View>
                <View style={styles.columnContainer}>
                    <Text
                        testID='made-attempts-text-input-title'
                        style={styles.labelTitle}>
                        Made Attempts
                    </Text>
                    <TextInput
                        testID='made-attempts-text-input'
                        style={styles.textInputStyle}
                        editable
                        placeholder='Made Attempts...'
                        keyboardType='numeric'
                        autoCapitalize='none'
                        contextMenuHidden
                        value={madeAttempts?.toString()}
                        onChangeText={(value) => {
                            dispatch(setShootAroundFormValues({
                                totalAttempts: totalAttempts,
                                madeAttempts: value,
                                shootAroundSpot: shootAroundSpot
                            }));
                        }} />
                </View>
            </View>
            {error.isPresent && (
                <View>
                    <Text testID='add-shoot-around-error-text'>{error.text}</Text>
                </View>
            )}
            <Button
                label='Submit'
                testID='add-shoot-around-submit-button'
                labelTestID='add-shoot-around-submit-button-label'
                disabled={submitDisabled}
                loading={isLoading}
                onPress={() => dispatch(submitShootAround())} />
            <Snackbar
                label='Saved successfully'
                testID='add-shoot-success-snackbar'
                labelTestID='add-shoot-success-snackbar-label'
                visible={submitSuccess}
                duration={2000}
                onDismiss={() => dispatch(setAddShootAroundSubmitSuccess(false))} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 8
    },
    labelTitle: {
        fontWeight: 'bold',
        color: colors.primaryColor,
        fontSize: 16
    },
    textInputStyle: {
        color: colors.grey,
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginEnd: 16,
        height: 32
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        marginBottom: 8
    },
    columnContainer: {
        width: '50%'
    },
});

export default AddShootAroundScreen;