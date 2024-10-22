import React from 'react';
import Button, { ButtonKinds, ButtonSizes } from '@distate/app/src/pages/POA/MCHD_ROOT/common/Button';
import styled from 'styled-components';

import { IButton } from '@distate/app/src/pages/POA/MCHD_ROOT/common/Button/Button';
import Dialog from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/Dialog";
import SearchModalContent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/SearchModalContent";
import AddModalContent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/AddModalContent";
import DownloadModalContent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/DownloadModalContent";
import {OpenDialogProps, useDialog} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/useDialog";
import { Link } from 'react-router-dom';
import CancelModalContent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/CancelModalContent";
import {Box} from "grommet";
import ReactDOM from "react-dom";
import {EdgeInsets} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/utils/EdgeInsets";
import {
  IconArrowUp, IconBackLeft, IconCheckBox,
  IconMarkerAlt,
  IconNa,
  IconPlus,
  IconReload,
  IconSearch,
  IconUpload
} from "../../../../assets/icons";
import {DashboardPresenter} from "../presenter/DashboardPresenter";


interface PoaActionButtonsListProps {
  selectedPoa: any;
  isCompany: boolean;
  presenter: DashboardPresenter;
}


const PoaActionButtonsList: React.FC<PoaActionButtonsListProps> = ({ selectedPoa, isCompany, presenter }: PoaActionButtonsListProps) => {
  const { showDialog, hideDialog } = useDialog();
  const openDialog = (openDialogProps: OpenDialogProps, event: any) => {
    showDialog(
         <Dialog
             dialogContainerStyle={openDialogProps.dialogContainerStyle}
             maxWidth={openDialogProps.maxWidth}
             minWidth={openDialogProps.minWidth}
             minHeight={openDialogProps.minHeight}
             maxHeight={openDialogProps.maxHeight}
             titleCentered={openDialogProps.titleCentered}
             width={openDialogProps.width}
             height={openDialogProps.height}
            position={openDialogProps.position}
             isShowArrow={openDialogProps.isShowArrow}
            // positionOffset={positionOffset}
            alignment={openDialogProps.alignment ?? "center"}
            overlayColor={openDialogProps.overlayColor}
            isScrollable={openDialogProps.isScrollable ?? false}
            title={openDialogProps.title}
            content={openDialogProps.content}
            actions={openDialogProps.actions}
            onClose={hideDialog}
        />

    );
  };

  const openDialogWithPortal = (openDialogProps: OpenDialogProps, event: any) => {
    const positionOffset: EdgeInsets = {
      top: event.currentTarget.parentElement.offsetTop + event.currentTarget.parentElement.offsetHeight + 90,
      left: event.currentTarget.parentElement?.offsetLeft + 100
    };
    console.log(positionOffset);

    const dialog = <Dialog
        dialogContainerStyle={openDialogProps.dialogContainerStyle}
        maxWidth={openDialogProps.maxWidth}
        minWidth={openDialogProps.minWidth}
        minHeight={openDialogProps.minHeight}
        maxHeight={openDialogProps.maxHeight}
        titleCentered={openDialogProps.titleCentered}
        width={openDialogProps.width}
        height={openDialogProps.height}
        position={openDialogProps.position}
        isShowArrow={openDialogProps.isShowArrow}
        positionOffset={positionOffset}
        alignment={openDialogProps.alignment ?? "center"}
        overlayColor={openDialogProps.overlayColor}
        isScrollable={openDialogProps.isScrollable ?? false}
        title={openDialogProps.title}
        content={openDialogProps.content}
        actions={openDialogProps.actions}
        onClose={hideDialog}
    />
    console.log("CCCCCCCCCC");
    // const body = document.getElementById("root");
    ReactDOM.createPortal(dialog, event.currentTarget as HTMLElement);

    showDialog(dialog);

  };


  interface IbuttonProps extends  IButton {
    isShow?: boolean;
    id?: string;
  }

  const buttonData: IbuttonProps[] = [
    {
      children: 'Поиск',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      // ref: searchRef,
      onClick: (event)=>openDialogWithPortal({
        alignment: "start",
        content: <SearchModalContent hideDialog={hideDialog}/>,
        position: "fixed",
        overlayColor: "transparent",
        dialogContainerStyle: {marginTop: "10px", padding: "10px", borderRadius: "0", border: "2px solid rgba(204, 204, 204, 1)"},
        width: "300px",
        maxWidth: "300px",
        maxHeight: "max-content",
        isScrollable: true,
        isShowArrow: true,


        title: 'Поиск по МЧД',
        titleCentered: true,
      }, event),
      icon: <IconSearch />,
      isShow: true

    },
    {
      children: 'Обновить',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      onClick: () => alert('Primary Button Clicked'),
      icon: <IconReload />,
      isShow: true
    },
    {
      children: 'Добавить',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      onClick: (event)=>openDialog({
        content: <AddModalContent hideDialog={hideDialog} />,
        title: <h2>Добавить МЧД</h2>,
        titleCentered: true,
        overlayColor: "rgba(255, 255, 255, 0.75)",
        width: "460px",
      }, event),
      icon: <IconPlus />,
      disabled: false,
      isShow: true
    },
    {
      children: 'Загрузить',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      onClick: (event)=>openDialog({
        content: <DownloadModalContent hideDialog={hideDialog} />,
        title: <h2 style={{marginTop: "30px" }}>Загрузить МЧД</h2>,
        titleCentered: true,
        dialogContainerStyle: {borderRadius: "0", paddingBottom: "10px"},
        height: "150px",
        overlayColor: "rgba(255, 255, 255, 0.75)"
      }, event),
      disabled: false,
      icon: <IconUpload />,
      isShow: true
    },
    {
      children: 'Создать',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      style: {display: isCompany ? 'block' : 'none'},
      onClick: (event)=>openDialog({
        content: <Link to={"/POA/create"} />,
        position: "fixed",
      }, event),
      icon: <IconMarkerAlt />,
      isShow: isCompany
    },
    {
      children: 'Отменить',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      style: {display: selectedPoa ? 'block' : 'none'},
      onClick: (event) => openDialog({
        content: <CancelModalContent hideDialog={hideDialog}/>,
        width: "460px",
        // height: "80px",
        isScrollable: false,
        title: <h2>Отменить МЧД?</h2>,
        actions: <></>,
        titleCentered: true,
        dialogContainerStyle: {borderRadius: "0", paddingBottom: "10px"},
        overlayColor: "rgba(255, 255, 255, 0.75)"
      }, event),
      icon: <IconNa />,
      isShow: selectedPoa
    },
    {
      children: 'Передоверить',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      style: { display: selectedPoa && isCompany ? 'block' : 'none' },
      onClick: (event)=>openDialog({
        content:  <Link to={"/POA/subtrust"} />,
      }, event),
      icon: <IconArrowUp />,
      isShow: selectedPoa && isCompany
    },
    {
      children: 'Подписать',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      style: { display: selectedPoa && isCompany ? 'block' : 'none' },
      // onClick: (event)=>openDialog({
      //   content: <CancelModalContent hideDialog={hideDialog} />,
      // }, event),
      icon: <IconCheckBox />,
      isShow: selectedPoa && isCompany
    },
    {
      children: 'Повторить',
      kind: ButtonKinds.Default,
      size: ButtonSizes.Small,
      style: { display: selectedPoa ? 'block' : 'none' },
      onClick: (e)=> {},
      icon: <IconBackLeft />,
      isShow: selectedPoa
    },

    // {
    //   children: 'change POA',
    //   kind: ButtonKinds.Default,
    //   size: ButtonSizes.Small,
    //   style: { display: 'block' },
    //   onClick: () => {
    //     setIsCompany(!isCompany);
    //   },
    // },

  ];


  const filteredButtons = buttonData.filter((button, _: any) => button.isShow)

  return (
    <>
      <Box  justify={"start"} direction={"row"} gap={"6px"} style={{margin: "0 20px", position: "relative"}}>

        {filteredButtons.map((buttonProps, index: number) => (
            <Button style={{width: "140px", }} key={index} {...buttonProps} />
        ))}
      </Box>
    </>
  );
}


export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;



export default PoaActionButtonsList;
