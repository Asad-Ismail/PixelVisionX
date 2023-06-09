import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from maskrcnn import *
import cv2

def visualize_dataset(dataset, idx):
    # Get the image and target from the dataset
    image, target = dataset[idx]
    #print(image.shape)

    # Convert the image tensor to a NumPy array and normalize it
    image_np = image.numpy().transpose(1, 2, 0)
    image_np = (image_np - image_np.min()) / (image_np.max() - image_np.min())

    # Create a figure and axis to plot the image
    fig, ax = plt.subplots(1, figsize=(12, 12))
    ax.imshow(image_np)
    idx=0
    # Iterate over the bounding boxes and masks
    for bbox, mask in zip(target["boxes"], target["masks"]):
        x1, y1, x2, y2  = bbox.numpy()
        w, h = x2 - x1, y2 - y1
        rect = patches.Rectangle((x1, y1), w, h, linewidth=1, edgecolor='r', facecolor='none')
        ax.add_patch(rect)
        mask_np = mask.numpy().astype(np.float32)
        ax.imshow(np.ma.masked_array(mask_np, mask_np == 0), alpha=0.7, cmap="jet")
        idx+=1

    plt.show()

if __name__=="__main__":
    # Load the dataset
    data_module = COCODataModule("/home/asad/Downloads/Balloons.v15i.coco-segmentation/")
    data_module.setup()

    # Visualize an example from the training set
    #visualize_dataset(data_module.train_dataset, 10)

    # Visualize an example from the validation set
    visualize_dataset(data_module.val_dataset, 2)
